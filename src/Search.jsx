import { useState, useEffect } from 'react';
import AllProducts from './AllProducts.json';
import { useLocation } from 'react-router-dom';

function SearchPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get('query');

    useEffect(() => {
        if (searchQuery) {
            const filteredProducts = AllProducts.data.filter(product =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setProducts(filteredProducts);
            setLoading(false);
        }
    }, [searchQuery]);

    return (
        <div>
            <h1>Search Results for: {searchQuery}&quot;</h1>
            {loading ? <p>Loading...</p> : (
                <div className="products-list">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div key={product.id} className="product-card">
                                <img src={product.image} alt={product.title} className="product-image" />
                                <h2>{product.title}</h2>
                                <p>Price: ${product.price}</p>
                                <p>Category: {product.category}</p>
                                <p>Description: {product.description}</p>
                                <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
                            </div>
                        ))
                    ) : (
                        <p>No products found for &quot;{searchQuery}&quot;.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default SearchPage;
