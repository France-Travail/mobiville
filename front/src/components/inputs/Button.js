import styled from "styled-components"
import { COLOR_LIGHT_GREY, COLOR_PRIMARY, COLOR_WHITE } from "../../constants/colors"

const CustomButton = styled.button`
    width: 100%;
    padding: 24px;

    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;

    background-color: ${({ $primary }) => $primary ? COLOR_PRIMARY : COLOR_WHITE };
    color: ${({ $primary }) => $primary ? COLOR_WHITE : COLOR_PRIMARY };
    border: ${({ $light }) => $light ? `none` : `1px solid ${ COLOR_LIGHT_GREY }` };
    border-radius: 20px;

    font-weight: 700;
    font-size: ${({ $primary }) => $primary ? '18px' : '16px' };
`

const Button = ({
    primary = true,
    light = false,
    onClick,
    children
}) => {
    return (
        <CustomButton
            type="button"
            onClick={onClick}

            $primary={primary}
            $light={light}
        >
            { children }
        </CustomButton>
    )
}

export default Button