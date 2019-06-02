import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import SearchBox from './searchBox';


describe('A suite', function () {

    it('value of input should be props.value', function () {
        const props = { onChange: jest.fn(), value: "123" }; 
        const component = shallow(<SearchBox {...props} />);
        expect(component.find("input").first().props().value).toBe(props.value);
        // console.log(component.debug())
    });

    it('onChange should be called', function(){
        const props = { onChange: jest.fn(), value: "123" };
        const component = mount(<SearchBox {...props} />);
        component.find("input").simulate("change", { target: { value: "222" } });
        expect(props.onChange).toHaveBeenCalled();
    })
    
    it ('test children', function(){
        const props = { onChange: sinon.spy(), value: "123" };
        const component = shallow(<SearchBox {...props}>abc</SearchBox>);
        expect(component.find(".search-box").first().text()).toBe("abc");
        // console.log(component.find(".search-box").debug())
    })
})




