import React from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

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
function RenderComments({comments}){
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
                </div>
            );

        }
        else{
            return(<div></div>);
        }
}

    const DishDetail=(props) =>{
        if(props.dish != null){
            return(
                <div className="row">
                    <RenderDish dish={props.dish}/>
                    <RenderComments comments={props.dish.comments}/>
                </div>
            );
        }
        else{
            return(<div></div>);
        }
}

export default DishDetail;