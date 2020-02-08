import React, { Component } from 'react';
import EventsContext from '../../EventsContext';
import './Budget.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Budget extends Component {   
    static contextType = EventsContext;
    
    state = {
        total: this.context.selectedEvent.budget.total,
        venue: this.context.selectedEvent.budget.venue,
        food: this.context.selectedEvent.budget.food,
        drinks: this.context.selectedEvent.budget.drinks,
        decorations: this.context.selectedEvent.budget.decorations,
        other: this.context.selectedEvent.budget.other,
        overBudget: false
    };

    renderOverBudget = () => {
        return (
            this.state.overBudget
            ? <p>You have exceeded the budget!</p>
            : null
        );
    }

    setOverBudget = () => {
        this.setState({
            overBudget: true
        });
    }
    
    render() {
        function sum(total, num) {
            return parseInt(total) + parseInt(num);
        }
        
        const { total } = this.state;

        const budgetArray = Object.values(this.state);
        budgetArray.shift();

        const filteredArray = budgetArray.filter(Boolean);

        let sumArray;
        
        filteredArray.length
        ? sumArray = filteredArray.reduce(sum)
        : sumArray = 0;

        const remaining = total - sumArray;

        if (remaining < 0) {
            this.setOverBudget();
        }
        
        return (
            <section className="budget">
                <p className="total-budget">Budget: ${this.context.selectedEvent.budget.total}</p>
                {this.renderOverBudget()}
                <p className="budget-item">{this.state.overBudget ? '' : `Remaining Budget: ${remaining}`}</p>
                <p className="budget-item">Venue: ${this.context.selectedEvent.budget.venue}</p>
                <p className="budget-item">Food: ${this.context.selectedEvent.budget.food}</p>
                <p className="budget-item">Drinks: ${this.context.selectedEvent.budget.drinks}</p>
                <p className="budget-item">Decorations: ${this.context.selectedEvent.budget.decorations}</p>
                <p className="budget-item">Other: ${this.context.selectedEvent.budget.other}</p>
                <div className="edit-button">
                    <button 
                        onClick={() => this.props.displayBudgetForm()}
                        className="edit"
                    >
                        <FontAwesomeIcon icon="edit" /> Edit
                    </button>
                </div>
            </section>
        );
    }
}

export default Budget;