import React, {Component} from 'react';

export default class CustomHeader extends Component {
    constructor(props) {
        super(props);

        props.reactContainer.style.display = "inline-block";

        this.state = {
            ascSort: 'inactive',
            descSort: 'inactive',
            noSort: 'inactive'
        };

        props.column.addEventListener('sortChanged', this.onSortChanged.bind(this));
    }

    componentDidMount() {
        this.onSortChanged();
    }

    render() {
        let ExpandIcon = null;
        if (this.props.showExpandIcon) {
            ExpandIcon =
                <div onClick={this.props.expandHandler}
                     className="customHeaderMenuButton">
                    <i >+/-</i>
                </div>
        }

        let sort = null;
        if (this.props.enableSorting) {
            sort =
                <div style={{display: "inline-block"}}>
                    <div className={`customSortDownLabel ${this.state.ascSort}`}>
                        <i class="fa fa-long-arrow-down"></i>
                    </div>
                    <div className={`customSortUpLabel ${this.state.descSort}`}>
                        <i class="fa fa-long-arrow-up"></i>
                    </div>
                </div>
        }

        return (
            <div>
                {ExpandIcon}
                <div style={{display: "inline-block"}} onClick={this.onSortRequested.bind(this)}>
                    <div className="customHeaderLabel">{this.props.displayName}</div>
                    {sort}
                </div>
            </div>
        );
    }

    onMenuClicked() {
        this.props.showColumnMenu(this.menuButton);
    }

    onSortChanged() {
        this.setState({
            ascSort: this.props.column.isSortAscending() ? 'active' : 'inactive',
            descSort: this.props.column.isSortDescending() ? 'active' : 'inactive',
            noSort: !this.props.column.isSortAscending() && !this.props.column.isSortDescending() ? 'active' : 'inactive'
        });
    }

    onMenuClick() {
        this.props.showColumnMenu(this.menuButton);
    }

    onSortRequested( event) {
        const order = this.props.column.isSortAscending() ? 'desc' : 'asc'
        this.props.setSort(order, event.shiftKey);
    }
}