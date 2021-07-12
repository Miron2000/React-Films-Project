import React from "react";
import {shallow, mount, render} from '../../../enzyme';
import FormFilmAdd from "../FormFilmAdd";

jest.mock('reactjs-alert', () => ({
    __esModule: true,
    default: () => 'ReactJsAlert',
}));

describe.only("should render FormFilmAdd component", () => {
    it('should contain .form__add-film wrapper', () => {
        const component = shallow(<FormFilmAdd/>);
        console.log(component.debug())

        const wrapper = component.find('.form__add-film');
        console.log(wrapper.debug())
        expect(wrapper.length).toBe(1);
    });

    it('should contain textfield', () => {
        const component = shallow(<FormFilmAdd/>);
        const wrapper = component.find('input');
        expect(wrapper.length).toBe(0);
    });
})

describe("FormFilmAdd component", () => {
    it('should render FormFilmAdd component', () => {
        const component = shallow(<FormFilmAdd/>);
        expect(component).toMatchSnapshot();
    });

    it('should renders <InputCountries/> component', () => {
        const component = shallow(<FormFilmAdd/>);
        console.log(component.debug())
        expect(component.find('InputCountries')).toHaveLength(1);
    });
})

