import { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';

import Case from '../Case/Case';

import { getCases, addCase } from '../../model/model';

import { downloadDishsDataAction, addCaseAction } from '../../store/actions';
import './App.css';

class App extends PureComponent {

    state = {
        isInputActive: false,
        inputValue: ''
    };

    async componentDidMount() {
        const dishcase = await getCases();
        this.props.downloadDishsDataDispatch(dishcase);
    }

    inputCase = () => {
        this.setState({
            isInputActive: true
        });
    }

    onKeyDown = async (event) => {
        if (event.key === 'Escape') {
          this.setState({
            isInputState: false,
            inputValue: ''
          });
        }
    
        if (event.key === 'Enter') {
            const dishArrName = this.state.inputValue;

            this.setState({
                isInputState: false,
                inputValue: ''
            })
            const dishArr = { name: dishArrName, dishs: [] };
            await addCase(dishArr);
            this.props.addCaseDispatch(dishArr);
        }
    }
    
    onInputChange = (event) => {
        this.setState({
            inputValue: event.target.value
        });
    }

    render() {
        const { inputValue, isInputActive } = this.state;

        return (
            <Fragment>
                <header id="main-header">
                    Пиццерия    
                </header>
                <main id="main-container">
                    {this.props.dishcase.map((dishArr, index) => (
                        <Case key={`disharr-${index}`} dishArrId={index}/>
                    ))}
                    <div className="disharr">
                    {isInputActive && <input
                        type="text"
                        id="add-disharr-input"
                        placeholder="Имя повара"
                        value={inputValue}
                        onChange={this.onInputChange}
                        onKeyDown={this.onKeyDown}
                    />}
                    {!isInputActive && <header className="disharr-name" onClick={this.inputCase}>
                        Добавить повара
                    </header>}
                    </div>
                </main>
            </Fragment>
        );
    }
}

const mapStateToProps = ({ dishcase }) => ({ dishcase });

const mapDispatchToProps = dispatch => ({
    addCaseDispatch: (dishArr) => dispatch(addCaseAction(dishArr)),
    downloadDishsDataDispatch: (dishcase) => dispatch(downloadDishsDataAction(dishcase)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
