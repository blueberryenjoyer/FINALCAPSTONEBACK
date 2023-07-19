const client = require("./client"); //creates reviews

async function createReview(content, score, user_id, cat_id) { //content, score, user_id, cat_id
    try {
        const data = await client.query(
            `
    INSERT INTO reviews(content, score, user_id, cat_id)
    VALUES($1, $2, $3, $4)
    RETURNING *
    `,
            [content, score, user_id, cat_id]
        );

        console.log('it shouldve created a review')
        return data.rows[0];
    } catch (error) {
        throw error;
    }
}

async function getAllReviews() {
    try {
        const data = await client.query(
            `
        SELECT *
        FROM reviews;
      `
        );

        return data.rows;
    } catch (error) {
        throw error;
    }
}

async function fancyGetReviews(id) { //its working!! its working!!
    try {
        const data = await client.query(
            `
            select reviews.id, reviews.content, reviews.score, users.name, cats.catname
            from reviews
            inner join users on reviews.user_id=users.id
            inner join cats on reviews.cat_id=cats.id
            where reviews.cat_id = ${id}
            ;
      `
        );
        console.log(data.rows)
        console.log('this is the review page')

        return data.rows;
    } catch (error) {
        throw error;
    }
}


async function getExistingReviews(catid, username) {
    try {
        console.log('did we get to existingreviews?')
        console.log(catid)
        console.log(username)
        const data = await client.query(
            `
            select reviews.id, reviews.content, reviews.score, users.name, cats.catname
from reviews
inner join users on reviews.user_id=users.id
inner join cats on reviews.cat_id=cats.id
where cat_id='${catid}'
and name='${username}'
;
      `
        );
        console.log(data.rows)
        console.log('did we get through existingreviews?')

        return data.rows;
    } catch (error) {
        throw error;
    }
}

async function getUserReviews(username) {
    try {
        console.log('did we get to userreviews?')
        console.log(username)
        const data = await client.query(
            `
            select reviews.id, reviews.content, reviews.score, users.name, cats.catname
from reviews
inner join users on reviews.user_id=users.id
inner join cats on reviews.cat_id=cats.id
where name='${username}'
;
      `
        );
        console.log(data.rows)
        console.log('did we get through userreviews?')

        return data.rows;
    } catch (error) {
        throw error;
    }
}


async function updateReviewById(id, content, score) { //currently trying to input mehmet, should input 3
    try {
        const data = await client.query(
            `
  
      UPDATE reviews
      SET content = '${content}', score= '${score}'
      WHERE id='${id}';
   
    `,
        );
        return data.rows
    } catch (error) {
        throw error;
    }
}

async function getReviewById(id) {
    try {
        console.log('here')
        const data = await client.query(
            `
  
      SELECT * FROM reviews
      WHERE id=${id}
      ;
   
    `,
        );
        return data.rows
    } catch (error) {
        throw error;
    }
}

async function deleteReviewById(number) {
    try {
        console.log('deleting a review')
        console.log(number)
        const data = await client.query(
            `
      DELETE 
      FROM reviews
      WHERE id='${number}'
   
    `,
        );

        return data.rows;
    } catch (error) {
        throw error;
    }
}




module.exports = {
    createReview,
    getAllReviews,
    fancyGetReviews,
    getExistingReviews,
    getUserReviews,
    updateReviewById,
    getReviewById,
    deleteReviewById
};