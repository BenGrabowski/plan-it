import React, { Component } from 'react';

class BudgetForm extends Component {
    state = {
        total: undefined,
        venue: undefined,
        food: undefined,
        drinks: undefined,
        decorations: undefined,
        other: undefined
    }

    updateTotal = event => {
        this.setState({
            total: event.target.value
        });
    }

    updateVenue = event => {
        this.setState({
            venue: event.target.value
        });
    }

    updateFood = event => {
        this.setState({
            food: event.target.value
        })
    }

    updateDrinks = event => {
        this.setState({
            drinks: event.target.value
        });
    }

    updateDecorations = event => {
        this.setState({
            decorations: event.target.value
        });
    }

    updateOther = event => {
        this.setState({
            other: event.target.value
        });
    }

    submitBudget = event => {
        event.preventDefault();
        const budget = this.state;
        this.props.updateBudget(budget);
    }
    
    render() {
        return (
            <div>
                <h3>Budget</h3>
                <div>
                    <label htmlFor="budget-total">Total: </label>
                    <input type="number" name="budget-total" onChange={event => this.updateTotal(event)} />
                </div>

                <div>
                    <label htmlFor="budget-venue">Venue: </label>
                    <input type="number" name="budget-venue" onChange={event => this.updateVenue(event)} />
                </div>

                <div>
                    <label htmlFor="budget-food">Food: </label>
                    <input type="number" name="budget-food" onChange={event => this.updateFood(event)} />
                </div>

                <div>
                    <label htmlFor="budget-drinks">Drinks: </label>
                    <input type="number" name="budget-drinks" onChange={event => this.updateDrinks(event)} />
                </div>

                <div>
                    <label htmlFor="budget-decorations">Decorations: </label>
                    <input type="number" name="budget-decorations" onChange={event => this.updateDecorations(event)} />
                </div>

                <div>
                    <label htmlFor="budget-other">Other: </label>
                    <input type="number" name="budget-other" onChange={event => this.updateOther(event)} />
                </div>
                <button onClick={event => this.submitBudget(event)}>Done</button>
                <button onClick={() => this.props.hideBudget()}>Cancel</button>
            </div>
        );
    }
}

export default BudgetForm;