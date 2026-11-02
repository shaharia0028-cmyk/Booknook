export type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description?: string;
  copies?: number;
  ownerName?: string;
  ownerEmail?: string;
};

export type Borrow = {
  _id: string;
  bookId: string;
  bookTitle: string;
  bookImage: string;
  borrowDate: string;
  returnDate: string;
};
