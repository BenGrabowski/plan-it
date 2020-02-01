import React, { Component } from 'react';
import EventsContext from '../../EventsContext';

class Budget extends Component {   
    static contextType = EventsContext;
    
    state = {
        total: this.context.selectedEvent.budget.total,
        venue: this.context.selectedEvent.budget.venue,
        food: this.context.selectedEvent.budget.food,
        drinks: this.context.selectedEvent.budget.drinks,
        decorations: this.context.selectedEvent.budget.decorations,
        other: this.context.selectedEvent.budget.other
    };
    
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
        
        return (
            <section className="budget">
                <p className="total-budget">Budget: ${this.context.selectedEvent.budget.total}</p>
                <p>Remaining Budget: ${remaining}</p>
                <p>Venue: ${this.context.selectedEvent.budget.venue}</p>
                <p>Food: ${this.context.selectedEvent.budget.food}</p>
                <p>Drinks: ${this.context.selectedEvent.budget.drinks}</p>
                <p>Decorations: ${this.context.selectedEvent.budget.decorations}</p>
                <p>Other: ${this.context.selectedEvent.budget.other}</p>
                <div className="edit-button">
                    <button onClick={() => this.props.displayBudgetForm()}>Edit</button>
                </div>
            </section>
        );
    }
}

export default Budget;