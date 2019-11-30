import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './FilterContent.css';
import * as actions from '../../../../../../store/actions/index'; 
import FilterOptions from '../../../../../../components/Main/FilterOptions/FilterOptions';
import FilterCategory from '../../../../../../components/Main/FilterCategory/FilterCategory';
import SelectCategs from '../../../../../../components/Main/FilterCategory/SelectCategs/SelectCategs';
import Loader from '../../../../../../components/UI/Loader/Loader';

class FilterContent extends Component {
    state = {
        filterOpt: {
            student: [
                {id: 4, filterType: 'Low', filterRangeIcn: 'angle-left', filterRange:  500},
                {id: 5, filterType: 'Average', filterRangeIcn: 'angle-right', filterRange:  '499 - 999'},
                {id: 6, filterType: 'High', filterRangeIcn: 'angle-right', filterRange:  999}
            ],
            comment: [
                {id: 7, filterType: 'Low', filterRangeIcn: 'angle-left', filterRange:  500},
                {id: 8, filterType: 'Average', filterRangeIcn: 'angle-right', filterRange:  '499 - 999'},
                {id: 9, filterType: 'High', filterRangeIcn: 'angle-right', filterRange:  999}
            ]
        },
        searchCnt: '',
        filterSelect: [],
        filterCategory: [],
        categoryGrp: ['post', 'question', 'poet'],
        categSelectGrp: 'post'
    }

    componentDidMount() {
        this.props.history.push('/users/startfilter')
        if (!this.props.categ) {
            this.props.onFetchCateg(this.state.categSelectGrp);
        }
    }

    componentWillUnmount() {
        this.props.onResetFilter();
    }

    searchHandler = (event) => {
        this.setState({searchCnt: event.target.value});
        this.props.onFilter({searchCnt: event.target.value, filterSelect: this.state.filterSelect, 
            category: this.state.filterCategory, categoryGrp: this.state.categSelectGrp, apply: false})
    }

    filterItmHandler = (filterGrp, rangeIcn, range, id) => {
        let rangeFilter = rangeIcn === 'angle-right' ? '$gt' : '$lt';
        let filterPayload = {
          rangeType: rangeFilter,
          rangeValue: range,
          filterGrp,
          id
        }

        let filterSelect = [...this.state.filterSelect];
        let checkItms = filterSelect.filter(filterItm => filterItm.filterGrp === filterGrp);
        if (checkItms.length > 0) {
            let removeItm = filterSelect.filter(filterItm => filterItm.id === id);
            if (removeItm.length > 0) {
                removeItm = filterSelect.filter(filterItm => filterItm.id !== id);
                this.setState({filterSelect: removeItm});
                this.props.onFilter({searchCnt: this.state.searchCnt, 
                    filterSelect: removeItm, category: this.state.filterCategory, 
                    categoryGrp: this.state.categSelectGrp, apply: false})
                return
            }
            let updateItms = filterSelect.filter(filterItm => filterItm.filterGrp !== filterGrp);
            updateItms.push(filterPayload);
            this.setState({filterSelect: updateItms});
            this.props.onFilter({searchCnt: this.state.searchCnt, 
                filterSelect: updateItms, category: this.state.filterCategory, 
                categoryGrp: this.state.categSelectGrp, apply: false})
            return
        }
        filterSelect.push(filterPayload);
        this.setState({filterSelect});
        this.props.onFilter({
            searchCnt: this.state.searchCnt, filterSelect, 
            category: this.state.filterCategory, categoryGrp: this.state.categSelectGrp, apply: false})
    }

    categSelectHandler = (category, index) => {
        let categs = [...this.state.filterCategory];
        let filterCateg = categs.filter(categ => categ.id === index);
        if (filterCateg.length > 0) {
            return
        }
        categs.push({id: index, category});
        this.setState({filterCategory: categs});
        this.props.onFilter({searchCnt: this.state.searchCnt, 
            filterSelect: this.state.filterSelect, category: categs, 
            categoryGrp: this.state.categSelectGrp, apply: false});
    };

    categSelectGrpHandler = (categ, index) => {
        if (this.state.categSelectGrp !== categ) {
            this.setState({categSelectGrp: categ, filterCategory: []})
            this.props.onFilter({
                searchCnt: this.state.searchCnt, filterSelect: this.state.filterSelect, 
                category: [], categoryGrp: categ, apply: false})
        }
    }

    removeSelectCategHandler = (id) => {
        let categs = [...this.state.filterCategory];
        let updateCateg = categs.filter(categ => categ.id !== id);
        this.setState({filterCategory: updateCateg});
        this.props.onFilter({searchCnt: this.state.searchCnt, filterSelect: this.state.filterSelect, category: updateCateg, apply: false});
    }

    
    closeFilterHandler = () => {
        this.props.onHideBackdrop()
    }

    applyFilterHandler = () => {
        this.props.onHideBackdrop();
        this.props.onFilter({searchCnt: this.state.searchCnt, filterSelect: this.state.filterSelect, category: this.state.filterCategory, apply: true});
        this.props.history.push('/users/filter')
    };
    
    render() {
        let category = <Loader />;
        let filterCategInfo = null
        let filterSrchClass = ['reuse-filter__opt--srch'];
        let totalFoundCnt = null;

        if (!this.props.totalFound) {
            filterSrchClass.push('reuse-filter__opt--srch__no-total')
        }

        if (this.props.totalFound && !this.props.filterErr) {
            filterSrchClass = ['reuse-filter__opt--srch']
            totalFoundCnt = (
                <div className="reuse-filter__opt--fnd">
                    <div className="reuse-filter__opt--fnd__title">
                        Found
                        <div className="reuse-filter__opt--fnd__title--total">
                            {this.props.totalFound}
                        </div>
                    </div>
                </div>
            )
        }

        if (this.props.filterErr) {
            filterSrchClass = ['reuse-filter__opt--srch']
            totalFoundCnt = (
                <div className="reuse-filter__opt--cnt__filter-err"> {this.props.filterErr.message} </div>
            )
        }
 
        if (this.props.categ) {
            category = <FilterCategory
                filterCategs={this.props.categ}
                categSelect={this.categSelectHandler}/>
        }

        if (this.state.filterCategory.length > 0 ) {
            filterCategInfo = (
                <div className="reuse-filter__opt--info">
                    <h3>
                        <FontAwesomeIcon 
                            icon={['fas', 'bars']} 
                            className="icon icon__reuse-filter--categ"/>
                        Category 
                    </h3>
                    <ul className="reuse-filter__opt--info__cnt">
                        <SelectCategs 
                            selectCategs={this.state.filterCategory}
                            removeSelectCateg={this.removeSelectCategHandler}/>
                    </ul>
                </div>
            );
        }
        
        return (
            <div className="reuse-filter__opt"> 
                <div className={filterSrchClass.join(' ')}>
                    <input 
                        type="text" 
                        className="reuse-filter__opt--srch__input" 
                        placeholder="Enter user name..." 
                        onChange={this.searchHandler}
                        value={this.state.searchCnt}/>
                </div>
                { totalFoundCnt }
                <div className="reuse-filter__opt--cnt">
                    <div className="reuse-filter__opt--cnt__wrapper reuse-filter__opt--cnt__wrapper--mid">
                        <h3 className="reuse-filter__opt--cnt__title">
                            <FontAwesomeIcon 
                                icon={['fas', 'bars']} 
                                className="icon icon__reuse-filter--categ"/>
                            Category Group
                        </h3>
                        <ul className="reuse-filter__opt--cnt__det reuse-filter__opt--cnt__det--categ">
                            <FilterCategory
                                filterCategs={this.state.categoryGrp}
                                categSelect={this.categSelectGrpHandler}
                                categSelectGrp={this.state.categSelectGrp}/>
                        </ul>
                    </div>
        
                    <div className="reuse-filter__opt--cnt__wrapper reuse-filter__opt--cnt__wrapper--mid">
                        <h3 className="reuse-filter__opt--cnt__title">
                            <FontAwesomeIcon 
                                icon={['fas', 'users']} 
                                className="icon icon__reuse-user-filter--sub"/>  
                            Students
                        </h3>
                        <ul className="reuse-filter__opt--cnt__det">
                            <FilterOptions
                                filterOptions={this.state.filterOpt.student}
                                filterItm={this.filterItmHandler.bind(this, 'student')}
                                filterSelect={this.state.filterSelect}/>
                        </ul>
                    </div>
        
                    <div className="reuse-filter__opt--cnt__wrapper reuse-filter__opt--cnt__wrapper--mid">
                        <h3 className="reuse-filter__opt--cnt__title">
                            <FontAwesomeIcon 
                                icon={['fas', 'pencil-alt']} 
                                className="icon icon__reuse-user-filter--ans"/>  
                            Comments/Answers
                        </h3>
                        <ul className="reuse-filter__opt--cnt__det">
                            <FilterOptions
                                filterOptions={this.state.filterOpt.comment}
                                filterItm={this.filterItmHandler.bind(this, 'comment')}
                                filterSelect={this.state.filterSelect}/>
                        </ul>
                    </div>
        
                    <div className="reuse-filter__opt--cnt__wrapper reuse-filter__opt--cnt__wrapper--mid">
                        <h3 className="reuse-filter__opt--cnt__title">
                            <FontAwesomeIcon 
                                icon={['fas', 'bars']} 
                                className="icon icon__reuse-filter--categ"/>
                            Category 
                        </h3>
                        <ul className="reuse-filter__opt--cnt__det reuse-filter__opt--cnt__det--categ">
                            { category }
                        </ul>
                    </div>
                </div>
        
                { filterCategInfo }
        
                <div className="reuse-filter__opt--btn">
                    <button 
                        className="reuse-filter__opt--btn__cancel" 
                        type="button"
                        onClick={this.closeFilterHandler}>
                        <FontAwesomeIcon 
                            icon={['fas', 'times']} 
                            className="icon icon__reuse-filter--cancel"/>
                        Cancel
                    </button>
                    <button 
                        className="reuse-filter__opt--btn__apply" 
                        type="button"
                        onClick={this.applyFilterHandler}
                        disabled={
                             this.props.totalFound === '0'? true: !this.props.totalFound}>
                        <FontAwesomeIcon 
                            icon={['fas', 'check']} 
                            className="icon icon__reuse-filter--apply"/>
                        Apply
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        totalFound: state.filter.totalFound,
        categ: state.filter.cntCateg,
        filterErr: state.filter.filterErr,
        tags: state.tags.tags
    };
};

const mapDispatchToProps = dispatch => {
    return {
         onHideBackdrop: () => dispatch(actions.hideMainBackdrop()),
         onFilter: (content) => dispatch(actions.filterContentInit(content)),
         onFetchCateg: (categ) => dispatch(actions.fetchCntCategInit(categ)),
         onResetFilter: () => dispatch(actions.resetFilter())
    };
 }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FilterContent));