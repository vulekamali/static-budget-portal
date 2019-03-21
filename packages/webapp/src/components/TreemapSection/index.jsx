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
            zoomInButtonState: false,
            zoomOutButtonState: true,
            departmentData: departmentData,
            zoomIndex: 0,
            isNationalBudget: true,
        };
        this.events = {
            eventZoomIn: this.eventZoomIn.bind(this),
            eventZoomOut: this.eventZoomOut.bind(this)
        };
    }

    eventZoomIn() {
        let {zoomIndex, departmentData} = this.state;
        zoomIndex += 1;
        const spliceIndex = this.zoomStep * zoomIndex;
        let splicedData = [...this.fullData];
        if (spliceIndex <= this.fullData.length) {
            splicedData.splice(0, spliceIndex);
            departmentData['expenditure']['national'] = splicedData;
            this.setState({
                departmentData: departmentData,
                zoomIndex: zoomIndex,
                zoomInButtonState: false,
                zoomOutButtonState: false,
            });
            this.treemapNode.data(splicedData).draw();
        }
        if (spliceIndex+this.zoomStep >= this.fullData.length) {
            this.setState({
                zoomInButtonState: true
            })
        }
    }

    eventZoomOut() {
        let {zoomIndex, departmentData} = this.state;
        zoomIndex -= 1;
        const spliceIndex = 5 * zoomIndex;
        let splicedData = [...this.fullData];
        if (spliceIndex >= 0) {
            splicedData.splice(0, spliceIndex);
            departmentData['expenditure']['national'] = splicedData;
            this.setState({
                departmentData: departmentData,
                zoomIndex: zoomIndex,
                zoomOutButtonState: false,
                zoomInButtonState: false,
            });
            this.treemapNode.data(splicedData).draw();
        }
        if (zoomIndex === 0) {
            this.setState({
                zoomOutButtonState: true
            })
        }
    }

    initTreemap() {
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
        this.zoomStep = 5;
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
            zoomInButtonState: state.zoomInButtonState,
            zoomOutButtonState: state.zoomOutButtonState,
            eventZoomIn: events.eventZoomIn,
            eventZoomOut: events.eventZoomOut,
        };

        return <Markup {...passedProps} />
    }
}


export default TreeMapSection;
