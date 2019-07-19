import knex from 'knex';
import bookshelf from 'bookshelf';
import knexfile from '../../knexfile';

const knexconn = knex(knexfile.development)
const bookshelfs = bookshelf(knexconn);

export default bookshelfs;