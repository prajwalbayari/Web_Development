const mongoose=require('mongoose');
const slugify=require('slugify');
const validator=require('validator');

const tourSchema=new mongoose.Schema({
    name:{
      type:String,
      required:[true,'Tour must have a name'],
      unique:true,
      trim:true,
      maxlength: [40,'A tour must have less than or equal to 40 characters'],
      minlength: [10,'A tour must have more than or equal to 10 characters'],
      // validate: [validator.isAlpha,'Tour name must only contains alphabets']
    },
    slug:String,
    duration:{
      type:Number,
      required:[true,'A tour must have duration']
    },
    maxGroupSize:{
      type:Number,
      required:[true,'A tour should have a group size']
    },
    difficulty:{
      type:String,
      required:[true,'A tour should have a difficulty'],
      enum:{
        values:['easy','medium','difficult'],
        message:'Difficulty is either easy medium or difficult'
      }
    },
    ratingsAverage:{
      type:Number,
      default:4.5,
      min:[1,'Rating must be greater than or equal to 1.0'],
      max:[5,'Rating must be less than or equal to 5.0']
    },
    ratingsQuantity:{
      type:Number,
      default: 0 
    },
    price:{
      type:Number,
      required:[true,'Tour must have a price']
    },
    priceDiscount:{
      type:Number,
      validate:{
        validator:function(val){
          // This only points on current document on new document creation
          return val<this.price;
        },
        message:'Discount price ({VALUE}) should be less than regular price'
    }
    },
    summary:{
      type:String,
      required:[true,'A tour must have a summary'],
      trim:true
    },
    description:{
      type:String,
      trim:true
    },
    imageCover:{
      type:String,
      required:[true,'A tour must have a cover image']
    },
    image:[String],
    createdAt:{
      type:Date,
      default:Date.now(),
      select:false
    },
    startDates:[Date],
    secretTour:{
      type:Boolean,
      default:false
    }
  },{
    toJSON: {virtuals:true},
    toObject: {virtuals:true}
  })

  tourSchema.virtual('durationWeeks').get(function(){
    return this.duration/7;
  })

  //MIDDLEWARS

  //1)DOCUMENT MIDDLEWARE: runs before .save() and .create()

  tourSchema.pre('save',function(next){
    this.slug=slugify(this.name,{lower:true});
    next();
  });
  
  // tourSchema.pre('save',function(next){
  //   console.log('Will save document')
  //   next();
  // }); 

  // tourSchema.post('save',function(doc,next){
  //   console.log(doc);
  //   next();
  // })

  // 2)QUERY MIDDLEWARE

  // tourSchema.pre('find',function(next){ //Executes oonly for find()
  tourSchema.pre('/^find/',function(next){     //Executes for all methods starting with find
    this.find({ secretTour:{$ne:true}});
    this.start=Date.now();
    next();
  })

  tourSchema.post('/^find/',function(docs,next){
    console.log(`Query took ${Date.now() - this.start} milliseconds`);
    next();
  })

  //3)AGGREGATION MIDDLEWARE

  tourSchema.pre('aggregate',function(next){
    console.log(this.pipeline());
    this.pipeline().unshift({$match :{ secretTour: {$ne:true}}})
    next();
  })
  
  const Tour=mongoose.model('Tour',tourSchema);
  
  module.exports=Tour;