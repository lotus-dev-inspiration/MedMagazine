import React, { Component } from 'react';
import './ArticlesFilter.css';

export default class ArtilcesFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sorting: 'date',
            filters: {
                language: [],
                theme: [],
                year: [],
                month: []
            }
        }
        this.sortingChange = this.sortingChange.bind(this);
        this.filterByTheme = this.filterByTheme.bind(this);
        this.filterByLanguage = this.filterByLanguage.bind(this);
        this.filterByMonth = this.filterByMonth.bind(this);
        this.filterByYear = this.filterByYear.bind(this);
    }

    sortingChange(event) {
        this.setState({
            sorting: event.target.value
        })
    }

    filterByYear(event) {
        this.setState({
            filters: { ...this.state.filters, year: event.target.value }
        })
    }

    filterByMonth(event) {
        this.setState({
            filters: {...this.state.filters, month: event.target.value}
        })
    }

    filterByTheme(event) {
        const target = event.target;
        const option = event.target.value;
        let options = this.state.filters.theme;

        console.log(target.checked);
        
        // if(target.checked) {
        //     options.push(option);
        // } else {
        //     const index = options.findIndex((innerOption) => {
        //         return innerOption === option;
        //     });
        //     options = options.splice(index,1);
        // }

        console.log(options);

        this.setState({
            filters: { ...this.state.filters, theme: event.target.value }
        })
    }

    filterByLanguage(event) {
        this.setState({
            filters: { ...this.state.filters, language: event.target.value }
        })
    }

    render() {
        return (
            <section className="ArticlesFilter">
                <div className="filter-close">
                    <i className="fa fa-close"></i>
                </div>      
                <article className="filter-part">
                    <h2>Sorting</h2>
                    <div>
                        <label htmlFor="date">Choose sorting by date</label>
                        <select name="date" id="date" value={this.state.sorting} onChange={this.sortingChange}>
                            <option value="date">Date increasing</option>
                            <option value="-date">Date decreasing</option>
                        </select>
                    </div>
                </article>
                <article className="filter-part">
                    <h2>Filters</h2>
                    <div>
                        <h3>Theme</h3>
                        IT <input name="it" type="checkbox" value="it" onChange={this.filterByTheme} /><br/>
                        Medicine <input name="medicine" type="checkbox" value="medicine" onChange={this.filterByTheme}/><br />
                        Math <input name="math" type="checkbox" value="math" onChange={this.filterByTheme}/><br />
                        Physics <input name="physics" type="checkbox" value="physics" onChange={this.filterByTheme}/><br />
                        Electronics <input name="electronics" type="checkbox" value="electronics" onChange={this.filterByTheme} /><br/>
                        Other <input name="other" type="checkbox" value="other" onChange={this.filterByTheme}/>
                    </div>
                    <div>
                        <h3>Language</h3>
                    </div>
                    <div>
                        <h3>Month</h3>
                    </div>
                </article>
            </section>
        )
    }
}