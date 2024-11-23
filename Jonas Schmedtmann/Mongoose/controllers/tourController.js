const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    //1A)Filtering

    // const queryObj={...req.query};
    // const excludedFields=['page','sort','limit','fields'];
    // excludedFields.forEach(el=>delete queryObj[el]);
    // console.log(req.query,queryObj);

    // //1B)Advanced filtering

    // let queryStr=JSON.stringify(queryObj);
    // queryStr=queryStr.replace(/\bgte|gt|lte|lt\b/g, match=>`$${match}`);
    // console.log(JSON.parse(queryStr));

    // let query=Tour.find(JSON.parse(queryStr));

    // 2)Sort

    // if(req.query.sort){
    //  const sortBy=req.query.sort.split(',').join(' ');
    //  query=query.sort(sortBy);
    // }else{
    //   query=query.sort('-createdAt');
    // }

    //3)Field limiting
    // if(req.query.fields){
    //   const fields=req.query.fields.split(',').join(' ');
    //   query=query.select(fields);
    // }else{
    //   query=query.select('');
    // }

    //4)Pagination
    // const page=req.query.page*1 || 1; //Converts string to number
    // const limit=req.query.limit*1 || 100;
    // const skip=(page-1)*limit;
    // console.log(skip);
    // query=query.skip(skip).limit(limit);
    // if(req.query.page){
    //   const numTours=await Tour.countDocuments();
    //   if(skip>numTours)
    //     throw new Error('This page does not exist');
    // }

    //EXECUTE

    // const tours =await Tour.find().where('duration').equals(5).where('difficulty').equals('easy');

    // const tours =await Tour.find(query);
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'failure',
      message: err.message
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'Success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'failure',
      message: 'Could not fetch document'
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body).then();

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour: tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'failure',
      message: 'Could not update tour due to some error'
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'failure',
      message: 'Wrong id'
    });
  }
};

//Aggregation Pipelining

exports.getTourStats =async (req,res)=>{
  try{
    const stats=await Tour.aggregate([
      {
        $match:{ratingsAverage: {$gte:4.5}}
      },
      {
        $group:{
          _id:{$toUpper:'$difficulty'},
          numTours:{$sum:1},
          numRatings:{$sum:'$ratingsQuantity'},
          avgRating:{$avg:'$ratingAverage'},
          avgPrice:{$avg:'$price'},
          minPrice:{$min:'$price'},
          maxPrice:{$max:'$price'}
        }
      },
      {
        $sort:{ avgPrice: -1 }
      },
      // {
      //   $match:{
      //     _id:{$ne:'EASY'}
      //   }
      // }
    ]);

    res.status(200).json({
      status: 'success',
      data: stats
    });
  }catch(err){
    res.status(404).json({
      status: 'failure',
      message: err
    });
  }
}

exports.getMonthlyPlan=async (req,res)=>{
  try{
    const year=req.params.year*1;

    const plan=await Tour.aggregate([
      {
        $unwind:'$startDates'
      },
      {
        $match:{
          startDates:{
            $gte:new Date(`${year}-01-01`),
            $lte:new Date(`${year}-12-31`)
          }
        }
      },
      {
        $group:{
          _id:{$month:'$startDates'},
          numTourStarts:{$sum:1},
          tours:{$push:'$name'}
        }
      },
      {
        $addFields:{month:'$_id'}
      },
      {
        $project:{
          _id:0
        }
      },
      {
        $sort:{numTourStarts:-1}
      },
      {
        $limit:6
      }
    ])

    res.status(200).json({
      status: 'success',
      data: plan
    });
  }catch(err){
    res.status(404).json({
      status: 'failure',
      message: err
    });
  }
}