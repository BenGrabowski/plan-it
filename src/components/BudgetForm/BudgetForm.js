import React, { Component } from 'react';
import EventsContext from '../../EventsContext';
import TokenService from '../../services/token-service';
import EventApiService from '../../services/events-api-service';

class BudgetForm extends Component {
    static contextType = EventsContext;
    
    state = {
        total: '',
        venue: '',
        food: '',
        drinks: '',
        decorations: '',
        other: '',
        displayBudget: false
    }

    componentDidMount() {
        if (this.props.params) {            
            this.setState({
                total: this.context.selectedEvent.budget.total,
                venue: this.context.selectedEvent.budget.venue,
                food: this.context.selectedEvent.budget.food,
                drinks: this.context.selectedEvent.budget.drinks,
                decorations: this.context.selectedEvent.budget.decorations,
                other: this.context.selectedEvent.budget.other,    
            })
        }
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

    displayBudget = () => {
        this.setState({ displayBudget: true });
    }

    displayForm = () => {
        this.setState({ displayBudget: false });
    }

    submitBudget = () => {
        const user_id = TokenService.getUserId();
                
        const updatedBudget = {
            total: this.state.total,
            venue: this.state.venue,
            food: this.state.food,
            drinks: this.state.drinks,
            decorations: this.state.decorations,
            other: this.state.other
        }
        
        if (!this.props.newEvent) {
            let newBudgetFields = this.context.selectedEvent;            
            newBudgetFields.budget = updatedBudget; 

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
                        })
                })
                .catch(err => this.context.setError(err))    
        }

        this.props.updateBudget(updatedBudget);
        this.displayBudget();
    }

    render() {        
        return (
            this.state.displayBudget
            ? 
            <div>
                <p>Total: {this.state.total}</p>
                <p>Venue: {this.state.venue}</p>
                <p>Food: {this.state.food}</p>
                <p>Drinks: {this.state.drinks}</p>
                <p>Decorations: {this.state.decorations}</p>
                <p>Other: {this.state.other}</p>
                <button onClick={this.displayForm}>Edit</button>
            </div>
            : <div className="budget-form">
                <h3>Budget</h3>
                <div>
                    <label htmlFor="budget-total">Total: </label>
                    <input 
                        type="number" 
                        name="budget-total" 
                        onChange={event => this.updateTotal(event)}
                        defaultValue={this.state.total} 
                    />
                </div>

                <div>
                    <label htmlFor="budget-venue">Venue: </label>
                    <input 
                        type="number" 
                        name="budget-venue" 
                        onChange={event => this.updateVenue(event)} 
                        defaultValue={this.state.venue} 
                    />
                </div>

                <div>
                    <label htmlFor="budget-food">Food: </label>
                    <input 
                        type="number" 
                        name="budget-food" 
                        onChange={event => this.updateFood(event)} 
                        defaultValue={this.state.food} 
                    />
                </div>

                <div>
                    <label htmlFor="budget-drinks">Drinks: </label>
                    <input 
                        type="number" 
                        name="budget-drinks" 
                        onChange={event => this.updateDrinks(event)} 
                        defaultValue={this.state.drinks} 
                    />
                </div>

                <div>
                    <label htmlFor="budget-decorations">Decorations: </label>
                    <input 
                        type="number" 
                        name="budget-decorations" 
                        onChange={event => this.updateDecorations(event)} 
                        defaultValue={this.state.decorations} 
                    />
                </div>

                <div>
                    <label htmlFor="budget-other">Other: </label>
                    <input 
                        type="number" 
                        name="budget-other" 
                        onChange={event => this.updateOther(event)} 
                        defaultValue={this.state.other} 
                    />
                </div>
                <button onClick={event => this.submitBudget(event)}>Done</button>
                <button onClick={() => this.props.hideBudget()}>Cancel</button>
            </div>
        );
    }
}

export default BudgetForm;