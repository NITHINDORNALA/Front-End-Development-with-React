import React, { Component } from 'react';
import { Card, CardImg, CardBody,CardText, Button, Modal, ModalHeader, ModalBody, Label, Row, Col, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';

function RenderDish({dish}){
    return(
    <div className="col-12 col-md-5 m-1">
        <Card>
            <CardImg src={dish.image} alt={dish.name}/>
            <CardBody>
                <CardTitle>
                    {dish.name}
                </CardTitle>
                <CardText>
                    {dish.description}
                </CardText>
            </CardBody>
        </Card>
    </div>
    );
}
function RenderComments({comments, addComment, dishId}) {
        if (comments != null)
        {
            const commentListItem =comments.map((comment)=>{
                return(
                    <div class="container">
                        <li key={comment.id}>
                            <p>{RenderComments(comment)}</p>
                            <p>{comment.comment}</p>
                            <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                        </li>

                    </div>
                );
            });
            return(
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                       {commentListItem}
                    </ul>
                    <CommentForm dishId={dishId} addComment={addComment} />
                </div>
            );

        }
        else{
            return(<div></div>);
        }
}

    const DishDetail=(props) =>{
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null) 
        if(props.dish != null){
            return (
                <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row row-header">
                    <div className="col-6">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-6">
                        <RenderComments comments={props.comments} />
                        <div>
                        <Button outline onClick={this.toggleModal}><span className="fa fa-edit fa-lg"></span> Submit Comment </Button>
                        </div>
                    </div>
                </div>
                </div>
            );
        }
        else{
            return(<div></div>);
        }
}


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

 
class CommentForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isModelOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.hadnleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModelOpen: !this.state.isModelOpen
        });
    }

    hadnleSubmit(values) {

        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {
        return(
            <div>
                <Modal isOpen={this.state.isModelOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.hadnleSubmit(values)}>
                            <Row className="form-group">
                                <Label for="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" name="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={12}>Your Name</Label>
                                <Col md={12}>
                                <Control.text model=".author" id="author" name="author" 
                                    placeholder="Author" 
                                    className="form-control" 
                                    validators={{
                                        required,
                                        minLength: minLength(3),
                                        maxLength: maxLength(15)
                                    }} 
                                />
                                <Errors className="text-danger" model=".author" show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Should have more than 3 Characters',
                                        maxLength: 'Should have 15 or less Characters'
                                    }}
                                />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="feedback" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.text model=".comment" id="comment" name="comment" 
                                        resize="none"
                                        rows="6" 
                                        className="form-control" 
                                        validators={{
                                            required,
                                        }} 
                                    />
                                    <Errors className="text-danger" model=".comment" show="touched"
                                        messages={{
                                            required: 'Required'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Button type="submit" value="submit" color="primary">Submit</Button>                            
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>

        )
    }
}


export default DishDetail;