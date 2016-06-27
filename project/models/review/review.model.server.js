//Gives a high level API to interact with the DB. Only DB operations should be done here.
module.exports = function() {

    var mongoose = require('mongoose');

    var ReviewSchema = require("./review.schema.server")();

    //This User object is the one that allows to actually create an instance of a User to write to the DB.
    var Review = mongoose.model("Review", ReviewSchema);

    var api = {
        createReview: createReview,
        findAllReviews: findAllReviews,
        findReviewById: findReviewById,
        findReviewByApiMovieId: findReviewByApiMovieId,
        findReviewByUserId: findReviewByUserId,
        updateReview: updateReview,
        deleteReview: deleteReview

    };
    return api;

    function createReview(review) {
        return Review.create(review);
    }

    function findAllReviews() {
        return Review.find();
    }
    
    function findReviewById(reviewId) {
        return Review.findById(reviewId);
    }

    function findReviewByApiMovieId(apiMovieId) {
        return Review.find({"apiMovieId": apiMovieId});
    }

    function findReviewByUserId(userId) {
        return Review.find({userId: userId});
    }

    function updateReview(reviewId, updatedReview) {
        delete Review._id;
        return Review.update({"_id": reviewId}, {
            $set: updatedReview
        });
    }

    function deleteReview(reviewId) {
        return Review.remove({_id: reviewId});
    }
};