import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let reviews

export default class ReviewsDAO {
  static async injectDB(conn) {
    if (reviews) {
      return
    }
    try {
      reviews = await conn.db(process.env.REVIEWS_NS).collection("reviews")
    } catch (e) {
      console.error(`Unable to establish collection handles in ReviewsDAO: ${e}`)
    }
  }

  static async addReview(movieId, user, review, date) {
    try {
      const reviewDoc = {
        user: user,
        date: date,
        review: review,
        movie_id: movieId.toString(), // Ensure movie_id is stored as string
      }

      return await reviews.insertOne(reviewDoc)
    } catch (e) {
      console.error(`Unable to post review: ${e}`)
      return { error: e }
    }
  }

  static async getReview(reviewId) {
    try {
      return await reviews.findOne({ _id: new ObjectId(reviewId) })
    } catch (e) {
      console.error(`Unable to get review: ${e}`)
      return { error: e }
    }
  }

  static async updateReview(reviewId, user, review, date) {
    try {
      const updateResponse = await reviews.updateOne(
        { user: user, _id: new ObjectId(reviewId) },
        { $set: { review: review, date: date } },
      )

      return updateResponse
    } catch (e) {
      console.error(`Unable to update review: ${e}`)
      return { error: e }
    }
  }

  static async deleteReview(reviewId, user) {
    try {
      const deleteResponse = await reviews.deleteOne({
        _id: new ObjectId(reviewId),
        user: user,
      })

      return deleteResponse
    } catch (e) {
      console.error(`Unable to delete review: ${e}`)
      return { error: e }
    }
  }

  static async getReviewsByMovieId(movieId) {
    try {
      // Find reviews with movie_id matching as string
      const cursor = await reviews.find({ movie_id: movieId.toString() })
      return cursor.toArray()
    } catch (e) {
      console.error(`Unable to get reviews: ${e}`)
      return { error: e }
    }
  }
}
