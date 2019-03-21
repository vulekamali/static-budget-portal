import React, {Component} from 'react';
import Markup from './Markup';
import {colorArray} from './Treemap/data/colors'
import trimValues from '../../helpers/trimValues';

class TreeMapSection extends Component {
    constructor(props) {
        super(props);
        this.initTreemap = this.initTreemap.bind(this);

        let sortedBudgetColor = null;
        let departmentData = this.props.spendingData;
        if (departmentData !== null) {
            const deptAmounts = departmentData['expenditure']['national'];
            const originalBudget = deptAmounts.filter(function (amount) {
                return amount['budget_phase'] === "Main appropriation" && amount.financial_year === 2019;
            });
            let sortedBudget = originalBudget.sort((a, b) => b.amount - a.amount);
            const colored = index => colorArray[index];
            sortedBudgetColor = sortedBudget.map((amount, index) => ({
                color: colored(index),
                ...amount
            }));
            departmentData.expenditure.national = sortedBudgetColor;
        }

        this.state = {
            selected: null,
            buttonState: false,
            departmentData: departmentData,
            zoomIndex: 0,
            isNationalBudget: true,
        };

        this.events = {
            eventHandler: this.eventHandler.bind(this),
            eventZoomIn: this.eventZoomIn.bind(this),
            eventZoomOut: this.eventZoomOut.bind(this)
        };

        let treemapNode = null;
        let fullData = null;
    }

    eventZoomIn() {
        let {zoomIndex, departmentData} = this.state;
        zoomIndex += 1;
        const spliceIndex = 5 * zoomIndex;
        let splicedData = [...this.fullData];
        if (spliceIndex < this.fullData.length) {
            splicedData.splice(0, spliceIndex);
            console.log(0, spliceIndex);
            console.log(splicedData);
            departmentData['expenditure']['national'] = splicedData;

            this.setState({
                departmentData: departmentData,
                zoomIndex: zoomIndex,
            });
            this.treemapNode.data(splicedData).draw();
        }
    }

    eventZoomOut() {
        let {zoomIndex, departmentData} = this.state;
        zoomIndex -= 1;
        const spliceIndex = 5 * zoomIndex;
        let splicedData = [...this.fullData];
        if (spliceIndex >= 0) {
            splicedData.splice(0, spliceIndex);
            console.log(0, spliceIndex);
            console.log(splicedData);
            departmentData['expenditure']['national'] = splicedData;

            this.setState({
                departmentData: departmentData,
                zoomIndex: zoomIndex,
            });
            this.treemapNode.data(splicedData).draw();
        }
    }

    eventHandler(e) {
        this.setState({selected: e, buttonState: !this.state.buttonState});
    }

    initTreemap(data) {
        return window.d3plus.viz()
            .container("#treemap")
            .data(this.state.departmentData.expenditure.national)
            .type("tree_map")
            .id("name")
            .size("amount")
            .font({"family": "Roboto", size: 15})
            .labels({
                "align": "left",
                "valign": "top",
                "padding": 50,
                "resize": false,
                text: d => `${d.name} - R${trimValues(d.amount)}`
            })
            .color(d => d.color ? d.color : "")
            .legend(false)
            .resize(true)
            .mouse({
                click: this.eventHandler
            })
            .draw();
    }

    componentDidMount() {
        this.treemapNode = this.initTreemap();
        this.fullData = this.props.spendingData['expenditure']['national'];
    }

    render() {
        const {state, events} = this;
        const {departmentData, isNationalBudget} = state;

        const passedProps = {
            isNationalBudget,
            latestBudget: departmentData.expenditure.national,
            totalBudget: departmentData['total_budgets']['Main appropriation']['2019'],
            eventHandler: events.eventHandler,
            selected: state.selected,
            buttonState: state.buttonState,
            eventZoomIn: events.eventZoomIn,
            eventZoomOut: events.eventZoomOut,
        };

        return <Markup {...passedProps} />
    }
}


export default TreeMapSection;
