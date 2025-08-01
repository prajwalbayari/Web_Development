const { Router } = require("express");
const router = Router();
const multer = require("multer");
const path = require("path");
const Blog = require("../models/Blog");
const User = require("../models/user");
const Comment = require("../models/comment");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(`./public/uploads`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});
const upload = multer({ storage: storage });

router.get("/add-new", (req, res) => {
  return res.render("addBlog", { user: req.user });
});

router.get("/:id", async (req, res) => {
  try {
    // Check if user is authenticated - redirect to signin if not
    if (!req.user) {
      return res.redirect("/user/signin");
    }
    
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    
    if (!blog) {
      return res.redirect("/");
    }
    
    // Fetch comments for authenticated users
    const comments = await Comment.find({ blogId: req.params.id })
      .populate("createdBy")
      .sort({ createdAt: -1 });
    
    return res.render("blog", { 
      user: req.user, 
      blog, 
      comments,
      isAuthenticated: true,
      showFullContent: true
    });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return res.redirect("/");
  }
});

router.get("/edit/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    // Check if blog exists
    if (!blog) {
      return res.redirect("/");
    }
    
    // Check if user is the author
    if (!req.user || blog.createdBy.toString() !== req.user.id) {
      return res.redirect("/");
    }
    
    return res.render("editBlog", { user: req.user, blog });
  } catch (error) {
    console.error("Error fetching blog for edit:", error);
    return res.redirect("/");
  }
});

router.post("/edit/:id", upload.single("coverImageURL"), async (req, res) => {
  try {
    const { title, body } = req.body;
    const blog = await Blog.findById(req.params.id);
    
    // Check if blog exists
    if (!blog) {
      return res.redirect("/");
    }
    
    // Check if user is the author
    if (!req.user || blog.createdBy.toString() !== req.user.id) {
      return res.redirect("/");
    }
    
    // Update blog data
    const updateData = { title, body };
    
    // If new image uploaded, update cover image
    if (req.file) {
      updateData.coverImageURL = `/uploads/${req.file.filename}`;
    }
    
    await Blog.findByIdAndUpdate(req.params.id, updateData);
    
    return res.redirect(`/blog/${req.params.id}`);
  } catch (error) {
    console.error("Error updating blog:", error);
    return res.render("editBlog", {
      user: req.user,
      blog: await Blog.findById(req.params.id),
      error: "Failed to update blog. Please try again."
    });
  }
});

router.post("/", upload.single("coverImageURL"), async (req, res) => {
  const { title, body } = req.body;
  
  if (!req.user) {
    return res.redirect("/user/signin");
  }
  
  if (!req.file) {
    return res.render("addBlog", {
      user: req.user,
      error: "Please select a cover image"
    });
  }
  
  try {
    const coverImageURL = `/uploads/${req.file.filename}`;
    
    const blog = await Blog.create({
      title,
      body,
      createdBy: req.user.id,
      coverImageURL,
    });

    return res.redirect(`/blog/${blog.id}`);
    // Alternatively, you can redirect to the blog page directly
  } catch (error) {
    console.error("Error creating blog:", error);
    return res.render("addBlog", {
      user: req.user,
      error: "Failed to create blog. Please try again."
    });
  }
});

// Add comment to a blog
router.post("/:id/comment", async (req, res) => {
  try {
    const { content } = req.body;
    
    if (!req.user) {
      return res.redirect("/user/signin");
    }
    
    if (!content || content.trim().length === 0) {
      return res.redirect(`/blog/${req.params.id}`);
    }
    
    await Comment.create({
      content: content.trim(),
      createdBy: req.user.id,
      blogId: req.params.id,
    });
    
    return res.redirect(`/blog/${req.params.id}`);
  } catch (error) {
    console.error("Error creating comment:", error);
    return res.redirect(`/blog/${req.params.id}`);
  }
});

module.exports = router;
