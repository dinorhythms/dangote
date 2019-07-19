import bookshelf from '../db/bookshelf';

const User = bookshelf.Model.extend({
    tableName: 'users',
    role: ()=>{
        return this.hasOne(Role);
    },
    staff: ()=>{
        return this.hasOne(Staff);
    },
    guest: ()=>{
        return this.hasOne(Guest);
    },
    department: ()=>{
        return this.hasOne(Department);
    },
    guestComplaints: ()=>{
        return this.hasMany(GuestComplaint);
    },
    staffComplaints: ()=>{
        return this.hasMany(StaffComplaint);
    }
});
  
export default User;

// //Get all Authors with the books that they wrote
// router.get('/', (req, res, next) => {
//     Author
//     .fetchAll({withRelated: ['books']})
//     .then((author)=>{
//       res.json(author);
//     })
//   });
//   //Get Author with specified ID
//   router.get('/:id',(req, res, next) => {
//     Author
//     .where({id : req.params.id})
//     .fetch({withRelated: ['books']})
//     .then((author)=>{
//       res.json(author)
//     })
//   })
//   //Create a New Author
//   router.post('/', (req, res, next) => {
//     if(req.body.first_name){
//       Author.forge({
//         first_name : req.body.first_name,
//         last_name : req.body.last_name || null
//       })
//       .save()
//       .then((saved) => {
//         res.json({saved})
//       })
//     }
//     else{
//       res.status(400).send('Missing Parameters')
//     }
//   })
//   //Delete an Author with the Given ID
//   router.delete('/:id', (req, res, next) => {
//     Author.forge({id : req.params.id})
//     .fetch({require: true})
//     .then((author) => {
//       author.destroy()
//       .then(()=>{
//         res.json("Successfully deleted Author")
//       })
//     })
//   })
//   //Update the Author with the specified ID
//   router.patch('/:id', (req, res, next) => {
//     Author
//     .where({id : req.params.id})
//     .fetch({withRelated: ["books"]})
//     .then((author)=>{
//       author.save({
//         first_name : req.body.first_name || author.first_name,
//         last_name : req.body.last_name || author.last_name
//       }, {
//         method: 'update',
//         patch: true
//       })
//       .then((update)=>{
//         res.json(update);
//       })
//     })
//   })

// Get all books with associated authors and genres
// router.get('/', (req, res, next) => {
//     Book
//     .fetchAll({withRelated: ['author','genres']})
//     .then((books)=>{
//       res.json(books);
//     })
//   });
//   //Insert a book with the particular doctor and genres.
//   router.post('/', (req, res, next) => {
//     let genres = req.body.genres;
//     if(genres){
//       genres = genres.split(',').map((genre)=>{
//         return genre.trim();
//       })
//     }
//     else{
//       genres = ['undefined']
//     }
//     Book
//     .forge({
//       title : req.body.title,
//       year : req.body.year || null,
//       author_id : req.body.author_id
//     })
//     .save()
//     .then((book)=>{
//       genres.forEach((genre_name)=>{
//         Genre
//         .where({name : genre_name})
//         .fetch()
//         .then((genre)=>{
//           if(genre){
//             book.genres().attach(genre)
//           }
//           else{
//             Genre
//             .forge({
//               name : genre_name
//             })
//             .save()
//             .then((new_genre)=>{
//               book.genres().attach(new_genre)
//             })
//           }
//         })
//       })
//     })
//     .then(()=>{
//       res.json("Values Inserted")
//     })
//   })