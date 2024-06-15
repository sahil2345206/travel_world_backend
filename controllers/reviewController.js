import Tour from '../models/Tour.js'
import Review from '../models/Review.js'

export const createReview = async (req, res) => {

    const tourId = req.params.tourId
    const newReview = new Review({...req.body})

    try {
        const savedReview = await newReview.save()

        // after creating a new review we now update the reviews array of the tour
        await Tour.findByIdAndUpdate(tourId, { 
            $push: { reviews: savedReview._id } 
        })

        res
        .status(200)
        .json({ success: true, message : "Review submitted", data: savedReview })
    } catch(err){
        res.status(500).json({ success: false, message: "failed to submit." })
    }
}


export const getAllReviewsForTour = async (req, res) => {
    const tourId = req.params.tourId;
    
    try {
      const reviews = await Review.find({ productId: tourId }).populate('productId', 'name'); // Adjust based on your Tour model fields
      res.status(200).json({ success: true, data: reviews });
    } catch (err) {
      res.status(500).json({ success: false, message: "Failed to retrieve reviews." });
    }
  };