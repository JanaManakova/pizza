import { PureComponent } from 'react';
import { connect } from 'react-redux';
import './Case.css';

import { addDish } from '../../model/model';

import Dish from '../Dish/Dish';
import { addDishAction } from '../../store/actions';


class Case extends PureComponent {

    onDishAdd = async () => {
        let dishName = prompt('Введите название блюда', '');
        if (!dishName || !dishName.trim()) {
            alert('Неправильное название!');
            return;
        }
        dishName = dishName.trim();

        /*let bookAuthor = prompt('Введите автора', '').trim();
        if (!bookAuthor || !bookAuthor.trim()) {
            alert('Невалидный автор!');
            return;
        }*/

      //  bookAuthor = bookAuthor.trim();
        const newDishData = {
            dish: {
                name: dishName,
               // author: bookAuthor
            },
            dishArrId: this.props.dishArrId
        };

        await addDish(newDishData);
        this.props.addDishDispatch(newDishData);
    }

    render() {
        const dishArrId = this.props.dishArrId;
        const dishArr = this.props.dishcase[dishArrId];

        return (
        <div className="disharr">
            <header className="disharr-name">
                { dishArr.name }
            </header>
            <div className="disharr-dishs">
                {dishArr.dishs.map((dish, index) => (
                    <Dish key={`dish-${index}`} dishId={index} dishArrId={dishArrId} />
                ))}
            </div>
            <footer className="disharr-add-task" onClick={this.onDishAdd}>
                Добавить блюдо
            </footer>
        </div>
        );
    }
}

const mapStateToProps = ({ dishcase }) => ({ dishcase });

const mapDispatchToProps = dispatch => ({
    addDishDispatch: ({ dish, dishArrId }) => dispatch(addDishAction({ dish, dishArrId })),
});
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Case);
