export interface Post {
    categories: {
        _key: string;
        _ref: string;
        _type: string;
    };
    _id: string;
    title: string;
    author: {
        name: string;
        image: string;
    };
    description: string;
    mainImage: {
        asset: {
            url: string;
        };
    };
    slug: {
        current: string;
    };
    comments: Comment[];
    body: [object];
    _createdAt: string;
    key1: string;
    key2: string;
    key3: string;
}

export interface Comment {
    approved: boolean;
    comment: string;
    email: string;
    name: string;
    post: {
        _ref: string;
        _type: string;
    };
    _createdAt: string;
    _id: string;
    _rev: string;
    _type: string;
    _updatedAt: string;
}