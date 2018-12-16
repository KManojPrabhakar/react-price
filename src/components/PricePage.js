import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';




class PricePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentIncludeValue: 0,
            name: '',
            domesticPriceValue: 0,
            internationalPriceValue: 0,
            deleteIndexValues: []

        }

        this.allIncludesValues = [];
        this.deleteIndexValues = [];
    }


    findDeleteIndex(elementIndex) {

        let findIndex = false;
        if (this.state.deleteIndexValues && this.state.deleteIndexValues.length > 0) {
            this.state.deleteIndexValues.forEach((data) => {
                if (data.index == elementIndex) {
                    findIndex = true;
                }
            })
        }

        return findIndex;
    }


    getPriceIncludeValues() {
        let component = [], that = this, hideElement = false;

        // console.log(chalkWarning('Webpack generated the following warnings: '));

        for (let i = 0; i <= this.state.currentIncludeValue; i++) {



            hideElement = false;
            // console.log('I get called from print.js!');


            // alert("showElement"+hideElement)
            hideElement = that.findDeleteIndex(i);
            // alert("showElement after"+hideElement)


            if (hideElement) {

                continue;
            }
           
            component.push(
                <Row key={`includeValues${i}`}>
                    <Col lg={4}>
                        <input type="text" placeholder="Name" onChange={(e) => this.updateNameValues(i, e)} value={this.state["name" + i]} id={`name${i}`} />
                    </Col>
                    <Col lg={4}>
                        <input type="number" placeholder="Domestic Price" onChange={(e) => this.updateDomesticPriceValues(i, e)} value={this.state["domestic" + i]} id={`domestic${i}`} />
                    </Col>
                    <Col lg={4} className="u_display_flex">
                        <Col lg={12}>
                            <input type="number" placeholder="International Price" onChange={(e) => this.updateInternationalValues(i, e)} value={this.state["international" + i]} id={`international${i}`} />
                        </Col>

                    </Col>

                </Row>

            );


        }


        return component;
    }


    updateNameValues(indexValue, e) {

        this.setState({ ['name' + indexValue]: e.target.value },
            () => this.updateCurrentIncludesValue(indexValue))



    }

    updateDomesticPriceValues(indexValue, e) {
        let domestic = 0, userEnteredDomesticValue = 0;

        this.allIncludesValues = [];
        this.totalDomesticPriceValue = 0;





        // console.log("domesticPriceValue before", domestic);

        userEnteredDomesticValue = Number(e.target.value);

        for (let i = 0; i <= this.state.currentIncludeValue; i++) {
            domestic = 0;

            if (this.state["domestic" + i] || this.state["domestic" + i] == 0) {
                domestic = Number(this.state["domestic" + i]);

            }
            // console.log("domesticPriceValue type of", typeof (domestic));

            this.allIncludesValues.push({
                domesticPrice: domestic,
            })



        }




        if (this.allIncludesValues && this.allIncludesValues.length > 0) {
            this.allIncludesValues.map((data, index) => {



                if (index != indexValue) {
                    this.totalDomesticPriceValue += Number(data.domesticPrice);

                }

            })
        }

        // console.log("allIncludesValues ", this.allIncludesValues);

        // console.log("totalDomesticPriceValue ", this.totalDomesticPriceValue);
        // console.log("current DomesticPriceValue value", userEnteredDomesticValue);



        // console.log("totalDomesticPriceValue value", this.totalDomesticPriceValue+userEnteredDomesticValue);


        this.setState({ domesticPriceValue: this.totalDomesticPriceValue + userEnteredDomesticValue, ["domestic" + indexValue]: e.target.value },
            () => this.updateCurrentIncludesValue(indexValue)
        );

    }

    updateInternationalValues(indexValue, e) {
        let international = 0, userEnteredInternationalValue = 0;

        this.allInternationalIncludesValues = [];
        this.totalInternationalPrice = 0;



        // console.log("international values before", international);





        userEnteredInternationalValue = Number(e.target.value);



        for (let i = 0; i <= this.state.currentIncludeValue; i++) {
            international = 0;



            if (this.state["international" + i] || this.state["international" + i] == 0) {
                international = Number(this.state["international" + i]);

            }

            // console.log("totalInternationalPrice type of", typeof (international));

            this.allInternationalIncludesValues.push({
                internationalPrice: international,
            })



        }




        if (this.allInternationalIncludesValues && this.allInternationalIncludesValues.length > 0) {
            this.allInternationalIncludesValues.map((data, index) => {

                if (index != indexValue) {
                    this.totalInternationalPrice += data.internationalPrice;

                }

            })
        }

        // console.log("totalInternationalPrice ", this.totalInternationalPrice);
        // console.log("current totalInternationalPrice value", userEnteredInternationalValue);



        // console.log("totalInternationalPrice value", this.totalInternationalPrice+userEnteredInternationalValue);


        this.setState({
            internationalPriceValue: this.totalInternationalPrice + userEnteredInternationalValue,
            ["international" + indexValue]: e.target.value
        },

            () => this.updateCurrentIncludesValue(indexValue)

        )

    }



    updateCurrentIncludesValue(indexValue) { // for updating index value

        this.userSelectedIndex = indexValue;
        this.deleteCurrentIncludeValue(indexValue);

        if (indexValue == this.state.currentIncludeValue) {

            this.setState((prevState) => ({ currentIncludeValue: prevState.currentIncludeValue + 1 }))

        }



    }

    deleteCurrentIncludeValue(indexValue) { // for deleting index value

        // console.log("deleteCurrentIncludeValue",indexValue)


        let deleteIndex = false;


        if (indexValue == this.userSelectedIndex) {


            if (!((this.state['name' + indexValue] != '') ||
                ((Number(this.state['domestic' + indexValue]) != 0)) ||
                ((Number(this.state['international' + indexValue]) != 0)))) { //for currentIndexValue

                deleteIndex = true


            }

            if (deleteIndex) {
                this.userSelectedIndex = null;
                this.deleteIndexValues.push({ index: indexValue })
                this.setState({
                    deleteIndexValues: this.deleteIndexValues
                })
                



            }


        }
    }

    getObjectValues() {

        this.allIncludesValues = [];

        // console.log("allIncludesValues before", this.allIncludesValues);
        let name = '', domestic = 0, international = 0;

        for (let i = 0; i <= this.state.currentIncludeValue; i++) {
            name = '';
            domestic = 0;
            international = 0;



            name = this.state["name" + i];
            domestic = this.state["domestic" + i];
            international = this.state["international" + i];





            if(name || domestic || international) {
                this.allIncludesValues.push({
                    name: name,
                    domesticPrice: domestic,
                    international: international
                })
            }
            

        }

        // console.log("allIncludesValues", this.allIncludesValues);
        this.objectValues = {
            includes: this.allIncludesValues
        }

        alert("objectValues" + JSON.stringify(this.objectValues));

        // console.log("all Object Values",this.objectValues)


    }




    render() {
        return (
            <div>
                <Container className="responsive-display-desktop" fluid={true}>

                    <Row>
                        <Col lg={4}>
                            <h3>Name </h3>
                        </Col>
                        <Col lg={4}>
                            <h3>Domestic </h3>
                        </Col> <Col lg={4}>
                            <h3>International </h3>
                        </Col>
                    </Row>

                    {this.getPriceIncludeValues()}

                    <Row>
                        <Col lg={4}>
                            <h3>Total </h3>
                        </Col>
                        <Col lg={4}>
                            <h3>Rs. {this.state.domesticPriceValue}(Estimate) </h3>
                        </Col> <Col lg={4}>
                            <h3>&#36; {this.state.internationalPriceValue}(Estimate) </h3>
                        </Col>
                    </Row>

                    <button onClick={() => this.getObjectValues()}>Get</button>



                </Container>


            </div>

        )
    }
}

export default PricePage;

