import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import FormInput from '../components/FormInput';

describe('FormInput Component', () => {
    const mockOnChange = jest.fn();
    const mockOnBlur = jest.fn();

    it('renders label and input correctly', () => {
        const { getByText, getByDisplayValue } = render(
            <FormInput
                label="Email"
                value="test@health.com"
                onChangeText={mockOnChange}
                onBlur={mockOnBlur}
            />
        );

        expect(getByText('Email')).toBeTruthy();
        expect(getByDisplayValue('test@health.com')).toBeTruthy();
    });

    it('displays error text when error and touched', () => {
        const { getByText } = render(
            <FormInput
                label="Email"
                value=""
                onChangeText={mockOnChange}
                onBlur={mockOnBlur}
                error="Email is required"
                touched={true}
            />
        );

        expect(getByText('Email is required')).toBeTruthy();
    });

    it('calls onChangeText when input changes', () => {
        const { getByDisplayValue } = render(
            <FormInput
                label="Email"
                value=""
                onChangeText={mockOnChange}
                onBlur={mockOnBlur}
            />
        );

        const input = getByDisplayValue('');
        fireEvent.changeText(input, 'hello@world.com');

        expect(mockOnChange).toHaveBeenCalledWith('hello@world.com');
    });
});