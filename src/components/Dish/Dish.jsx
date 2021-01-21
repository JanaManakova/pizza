import { PureComponent } from 'react';
import { connect } from 'react-redux';
import './Dish.css';

import { editDish, removeDish, moveDish } from '../../model/model';

import { 
    editDishNameAction,
    //editDishAuthorAction,
    removeDishAction,
    moveDishLeftAction,
    moveDishRightAction
} from '../../store/actions';


class Dish extends PureComponent {

    moveLeft = async () => {
        const moveData = {
            dishId: this.props.dishId,
            dishArrId: this.props.dishArrId
        };
        await moveDish({
            ...moveData,
            destShelfId: moveData.dishArrId - 1
        });
        this.props.moveDishLeftDispatch(moveData);
    }

    moveRight = async () => {
        const moveData = {
            dishId: this.props.dishId,
            dishArrId: this.props.dishArrId
        };
        await moveDish({
            ...moveData,
            destShelfId: moveData.dishArrId + 1
        });
        this.props.moveDishRightDispatch(moveData);
    }

    onRemove = async () => {
        const ok = window.confirm('Удалить блюдо?');
        if (!ok) {
            return;
        }

        const removeData = {
            dishId: this.props.dishId,
            dishArrId: this.props.dishArrId
        };
        await removeDish(removeData);
        this.props.removeDishDispatch(removeData);
    }

   /* onAuthorEdit = async () => {
        let newAuthor = prompt('Введите нового автора');
        if (!newAuthor || !newAuthor.trim()) {
            alert('Невалидный автор');
            return;
        }

        newAuthor = newAuthor.trim();

        const dish = this.props.dishcase[this.props.dishArrId].dishs[this.props.dishId];
        const dishEditData = {
            dishId: this.props.dishId,
            dishArrId: this.props.dishArrId,
            newAuthor: newAuthor
        };
        await editDish({
            ...dishEditData,
            newName: dish.name
        });
        //this.props.editDishAuthorDispatch(dishEditData);
    }*/

    onNameEdit = async () => {
        let newName = prompt('Введите новоe блюдо');
        if (!newName || !newName.trim()) {
            alert('Невалидное название');
            return;
        }
        
        newName = newName.trim();

        const dish = this.props.dishcase[this.props.dishArrId].dishs[this.props.dishId];
        const dishEditData = {
            dishId: this.props.dishId,
            dishArrId: this.props.dishArrId,
            newName: newName,
        };
       /* await editDish({
            ...dishEditData,
            newAuthor: dish.author
            //&&&&&&&&&&&
        });*/
        this.props.editDishNameDispatch(dishEditData);
    }

    render() {
        const { dishId, dishArrId } = this.props;
        const dish = this.props.dishcase[dishArrId].dishs[dishId];

        return (
            <div className="disharr-dish">
                <div className="disharr-dish-description">
                <div className="disharr-dish-name">
                    { dish.name }
                </div>
                </div>
                
                <div className="disharr-dish-controls">
                <div className="disharr-dish-controls-row">
                    <div className="disharr-dish-controls-icon left-arrow-icon" onClick={this.moveLeft}></div>
                    <div className="disharr-dish-controls-icon right-arrow-icon" onClick={this.moveRight}></div>
                </div>
                <div className="disharr-dish-controls-row">
                    <div className="disharr-dish-controls-icon delete-icon" onClick={this.onRemove}></div>
                </div>
                <div className="disharr-dish-controls-row">

                    <div className="disharr-dish-controls-icon editdesc-icon" onClick={this.onNameEdit}></div>
                </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ dishcase }) => ({ dishcase });

const mapDispatchToProps = dispatch => ({
    editDishNameDispatch: ({ dishId, dishArrId, newName }) => dispatch(editDishNameAction({ dishId, dishArrId, newName })),
    removeDishDispatch: ({ dishId, dishArrId }) => dispatch(removeDishAction({ dishId, dishArrId })),
    moveDishLeftDispatch: ({ dishId, dishArrId }) => dispatch(moveDishLeftAction({ dishId, dishArrId })),
    moveDishRightDispatch: ({ dishId, dishArrId }) => dispatch(moveDishRightAction({ dishId, dishArrId })),
});
  
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dish);
