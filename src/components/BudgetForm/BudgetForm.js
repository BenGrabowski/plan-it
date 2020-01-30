import React, { Component } from 'react';
import EventsContext from '../../EventsContext';
import TokenService from '../../services/token-service';
import EventApiService from '../../services/events-api-service';

class BudgetForm extends Component {
    static contextType = EventsContext;
    
    state = {
        total: undefined,
        venue: undefined,
        food: undefined,
        drinks: undefined,
        decorations: undefined,
        other: undefined,
        currentTotal: this.context.selectedEvent.budget.total,
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

    renderButtons = () => {
        return this.props.newEvent 
        ? null 
        : <div>
            <button onClick={event => this.submitBudget(event)}>Done</button>
            <button onClick={() => this.props.hideBudget()}>Cancel</button>
        </div>
    }

    submitBudget = () => {
        const user_id = TokenService.getUserId();
        
        let newBudgetFields = this.context.selectedEvent;
        newBudgetFields.budget = this.state; 

        EventApiService.patchEvent(
            user_id,
            this.context.selectedEvent.id,
            newBudgetFields
        )
            .then(() => {
                EventApiService.getEvents(user_id)
                    .then(events => {
                        this.props.hideBudget();
                        this.context.setEvents(events);
                    })
                    .then(() => {
                        EventApiService.getEvent(
                            this.props.eventId,
                            user_id
                        )
                            .then(event => this.context.setSelectedEvent(event))
                            .catch(this.context.setError);            
                    })
            })
    }



    render() {
        // const currentBudgetTotal = this.props.newEvent ? null : this.context.selectedEvent.budget.total;
        
        return (
            <div>
                <h3>Budget</h3>
                <div>
                    <label htmlFor="budget-total">Total: </label>
                    <input 
                        type="number" 
                        name="budget-total" 
                        onChange={event => this.updateTotal(event)}
                        value={this.props.displayBudgetForm ? this.props.currentBudget.total : undefined} 
                    />
                </div>

                <div>
                    <label htmlFor="budget-venue">Venue: </label>
                    <input 
                        type="number" 
                        name="budget-venue" 
                        onChange={event => this.updateVenue(event)} 
                        value={this.props.displayBudgetForm ? this.context.selectedEvent.budget.venue : undefined} 
                    />
                </div>

                <div>
                    <label htmlFor="budget-food">Food: </label>
                    <input 
                        type="number" 
                        name="budget-food" 
                        onChange={event => this.updateFood(event)} 
                        value={this.props.displayBudgetForm ? this.context.selectedEvent.budget.food : undefined} 
                    />
                </div>

                <div>
                    <label htmlFor="budget-drinks">Drinks: </label>
                    <input 
                        type="number" 
                        name="budget-drinks" 
                        onChange={event => this.updateDrinks(event)} 
                        value={this.props.displayBudgetForm ? this.context.selectedEvent.budget.drinks : undefined} 
                    />
                </div>

                <div>
                    <label htmlFor="budget-decorations">Decorations: </label>
                    <input 
                        type="number" 
                        name="budget-decorations" 
                        onChange={event => this.updateDecorations(event)} 
                        value={this.props.displayBudgetForm ? this.context.selectedEvent.budget.decorations : undefined} 
                    />
                </div>

                <div>
                    <label htmlFor="budget-other">Other: </label>
                    <input 
                        type="number" 
                        name="budget-other" 
                        onChange={event => this.updateOther(event)} 
                        value={this.props.displayBudgetForm ? this.context.selectedEvent.budget.other : undefined} 
                    />
                </div>
                {this.renderButtons()}
            </div>
        );
    }
}

export default BudgetForm;