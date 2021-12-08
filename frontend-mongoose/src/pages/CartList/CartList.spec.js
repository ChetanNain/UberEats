import React from 'react';
import { shallow } from 'enzyme';
import CartList from './CartList';

describe('CartList component', ()=>{
    let wrapper;
    let props;
    beforeAll(()=>{
         props = {
            id: '',
            dishName:'',
            price: '',
        }
        wrapper = shallow(<CartList cartItem={props}/>);
    })

    it('should render CartList when called', ()=>{
        expect(wrapper.find('.cardBody').exists()).toBe(true);
        expect(wrapper.find('.cart-info').exists()).toBe(true);
        expect(wrapper.find('p').exists()).toBe(true);
    })

    it('should have an item Image', ()=>{
        expect(wrapper.find('img').exists()).toBe(true);
        expect(wrapper.find('input').exists()).toBe(true);
    })

    it('Should call removeItem function when clicked', ()=>{
        const removeItemMock = jest.fn();
        wrapper = shallow(<CartList cartItem={props} removeItem={removeItemMock}/>);
        wrapper.find('.removeItem').simulate('click');
        expect(removeItemMock).toHaveBeenCalled();
    })
})