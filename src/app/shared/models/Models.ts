
export class UserCredentials {
  email: string;
  password: string;
}

export class User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  phoneNumber: string;
  birthday: string;
  interestTags: string[];
  gender: string;
  password: string;
  confirmPassword: string;
  favorites: SimpleUser[];
  isExpert: boolean;
  expertCategory: string;
  expertTags: string[];
  mainFields: string[];
  description: string;
  reviews: Review[];
  image: string;
}

export class Id {
  id: string;
}

export class SimpleUser {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
}

export class Review {
name: string;
title: string;
reviewText: string;
rating: number;
anonymity: boolean;
}
