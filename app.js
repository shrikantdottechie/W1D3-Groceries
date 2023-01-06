class Heading extends React.Component{
    render() {
        return(
            <h1>Groceries Items</h1>
        )
    }
}

class GroceriesItems extends React.Component {
    render() {
        return(
        
        <div className="card" style={{width:"15rem", marginBottom:"15px"}}>
                <img src={this.props.product.image} className="card-img-top" style={{width:"200px", height:"200px"}} />
                <div className="card-body">
                    <h5 className="card-title">${this.props.product.price}</h5>
                    <p className="card-text">{this.props.product.brand} {this.props.product.item}</p>
                    <p className="card-text">{this.props.product.unit}</p>
                    <p className="card-text">Stock: {this.props.product.quantity}</p>
                    <a onClick={() => this.props.handleAdd(this.props.product)} className="btn btn-primary">Add to Shopping List</a>
                </div>
            </div>
           
        )              
                                   
    }
} 

class ShoppingList extends React.Component {
    render() {
        return(
            <tbody>
                <tr>
                    <td>{this.props.product.brand} {this.props.product.item}</td>      
                    <td>{this.props.product.unit}</td>   
                    <td>${this.props.product.price}</td>
                    <td><button onClick={() => this.props.onDelete(this.props.product)} className="btn btn-sm btn-outline-danger">Delete</button></td> 
                    
                </tr>
            </tbody>
        )
        
    }
}

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            products: products,
            item: 'Decribe the item',
            brand: '',
            unit: '1 liter, 12 pack, 1kg, etc.',
            quantity: 0,
            price: '',
            isPurchased: false,
            image: '',
            shoppingListItem: []

        }
        
    }

    handleDelete = index => {
        const shoppingListItem = this.state.shoppingListItem.filter(item => item  !== index)
        this.setState({shoppingListItem: shoppingListItem});
    }

    addToList = (item) => {
        this.setState({shoppingListItem: [item, ...this.state.shoppingListItem]})
        console.log(this.state.shoppingListItem)
    }

    handleChange = (event) => {
        this.setState({[event.target.id] : event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const newProduct = {
            item: this.state.item,
            brand: this.state.brand,
            unit: this.state.unit,
            quantity: this.state.quantity,
            price: this.state.price,
            isPurchased: this.state.isPurchased,
            image: this.state.image
        }

        this.setState({
            products: [newProduct, ...this.state.products],
            item: 'Decribe the item',
            brand: '',
            unit: '1 liter, 12 pack, 1kg, etc.',
            quantity: 0,
            price: '',
            isPurchased: false,
            image: ''
            
        })

    }

    render() {
        return(
            <div>
                <Heading />
                <div className="product-container">
                {this.state.products.map((product, index) => product.isPurchased ?
                    ' ' : 
                        <GroceriesItems 
                            handleAdd= {this.addToList}
                            key= {index}
                            index= {index}
                            product= {product}
                        />)} 
                </div>
                
                <div className="bottom-container">
                    <div className="new-product">
                        <h3>Create New Product</h3>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group ">
                                <label htmlFor="item">Item</label>
                                <input className="form-control" type="text" value={this.state.item} id="item" onChange={this.handleChange}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="brand">Brand</label>
                                <input className="form-control" type="text" value={this.state.brand}  id="brand" onChange={this.handleChange}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="unit">Unit</label>
                                <input className="form-control" type="text" value={this.state.unit}  id="unit" onChange={this.handleChange}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="quantity">Quantity</label>
                                <input className="form-control" type="text" value={this.state.quantity}  id="quantity" onChange={this.handleChange} />
                            </div>

                            <div className="form-group ">
                                <label htmlFor="price">Price</label>
                                <input className="form-control" type="text" value={this.state.price}  id="price" onChange={this.handleChange}/>
                            </div>

                            <div className="form-group ">
                                <label htmlFor="image">Image</label>
                                <input className="form-control" type="text" value={this.state.image}  id="image" onChange={this.handleChange}/>
                            </div>  
                            <input type="submit"/>              
                        </form>
                    </div>

                    <div className="shopping-list">   
                            <h3>My Shopping List</h3>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                    <th scope="col">Item</th>
                                    <th scope="col">Unit</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Delete</th>
                                    </tr>
                                </thead>
                            
                                {this.state.shoppingListItem.map((item, index) => {
                                    return (
                                        <ShoppingList 
                                            key={index}
                                            product={item} 
                                            onDelete={this.handleDelete}
                                            id={index}
                                            
                                                       
                                        />
                                    )
                                })
                                } 
                            </table>   
                    </div>
                </div>

            </div>

        )
    }
}


ReactDOM.render(
    <App />,
    document.querySelector('.container')
)