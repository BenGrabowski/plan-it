import React, { Component } from 'react';
import EventsContext from '../../EventsContext';

class Budget extends Component {   
    static contextType = EventsContext;
    
    render() {
        const remainingBudget = this.context.selectedEvent.budget.total - this.context.selectedEvent.budget.venue - 
        this.context.selectedEvent.budget.food - this.context.selectedEvent.budget.drinks - this.context.selectedEvent.budget.decorations - this.context.selectedEvent.budget.other;
        
        return (
            <section className="budget">
                <p className="total-budget">Budget: ${this.context.selectedEvent.budget.total}</p>
                <p>Remaining Budget: ${remainingBudget}</p>
                <p>Venue: ${this.context.selectedEvent.budget.venue}</p>
                <p>Food: ${this.context.selectedEvent.budget.food}</p>
                <p>Drinks: ${this.context.selectedEvent.budget.drinks}</p>
                <p>Decorations: ${this.context.selectedEvent.budget.decorations}</p>
                <p>Other: ${this.context.selectedEvent.budget.other}</p>
                <button onClick={() => this.props.displayBudgetForm()}>Edit</button>
            </section>
        );
    }
}

export default Budget;