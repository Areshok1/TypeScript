import { Article } from './interfaces/Article';
import { Product } from './interfaces/Product';
import { createAccessControl } from './access/AccessControl';
import { CompositeValidator } from './validation/CompositeValidator';
import { articleValidator } from './validation/ArticleValidator';
import { productValidator } from './validation/ProductValidator';
import { Versioned } from './versioning/VersionedContent';
import { createVersionedContent } from './versioning/VersionedContent';

const article: Article = {
    id: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'draft',
    title: 'TypeScript Advanced Features',
    content: 'This is an article about advanced TypeScript features',
    authorId: 'author1',
    tags: ['typescript', 'programming'],
};

const product: Product = {
    id: '2',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'published',
    name: 'Gaming Laptop',
    description: 'A laptop with powerful hardware',
    price: 1999.99,
    stock: 5,
    categories: ['electronics', 'gaming'],
};



const articleAccessControl = createAccessControl<Article>();
const productAccessControl = createAccessControl<Product>();

console.log('Viewer access to delete article:', articleAccessControl.viewer.delete);
console.log('Admin access to update product:', productAccessControl.admin.update);



const compositeArticleValidator = new CompositeValidator<Article>();
compositeArticleValidator.addValidator(articleValidator);

const compositeProductValidator = new CompositeValidator<Product>();
compositeProductValidator.addValidator(productValidator);

const articleValidationResult = compositeArticleValidator.validate(article);
if (articleValidationResult.isValid) {
    console.log('Article is valid!');
} else {
    console.log('Article validation failed:', articleValidationResult.errors);
}

const productValidationResult = compositeProductValidator.validate(product);
if (productValidationResult.isValid) {
    console.log('Product is valid!');
} else {
    console.log('Product validation failed:', productValidationResult.errors);
}



const versionedArticle: Versioned<Article> = createVersionedContent(article);
console.log('Versioned Article:', versionedArticle);

const updatedArticle = { ...versionedArticle, title: 'Updated Title', version: versionedArticle.version + 1 };
console.log('Updated Versioned Article:', updatedArticle);

const versionedProduct: Versioned<Product> = createVersionedContent(product);
console.log('Versioned Product:', versionedProduct);

const updatedProduct = { ...versionedProduct, stock: 10, version: versionedProduct.version + 1 };
console.log('Updated Versioned Product:', updatedProduct);
