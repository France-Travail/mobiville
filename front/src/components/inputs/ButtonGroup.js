import { useEffect, useState } from "react"
import PropTypes from 'prop-types'
import styled from "styled-components"

import { COLOR_PRIMARY, COLOR_VERT_MOBIVILLE, COLOR_WHITE } from "../../constants/colors"

const computeButtonBorder = (index, lastIndex) => {
    if (index === 0) {
        return 'border-radius: 8px 0 0 8px' 
    } else if (index === lastIndex) {
        return 'border-radius: 0 8px 8px 0'
    }
}

const Button = styled.button`
    text-decoration: none;
    cursor: pointer;
    border: none;
    
    color: ${ COLOR_PRIMARY };
    font-size: 18px;

    background: ${ ({ selected }) => (selected ? COLOR_VERT_MOBIVILLE : COLOR_WHITE) };
    font-weight: ${ ({ selected }) => (selected ? 'bold' : '') };
    
    ${ ({ index, lastIndex }) => computeButtonBorder(index, lastIndex) };

    display: flex;
    column-gap: 10px;
    align-items: center;
    padding: 10px;

    p {
        margin: 0;
    }
`

const Container = styled.div`
    display: flex;
    border-radius: 6px;
`

const ButtonGroup = ({ defaultSelected, children, onChange = () => {} }) => {

    const [ selected, setSelected ] = useState(defaultSelected ?? children[0].props.id)

    const handleButtonClick = (buttonId) => {
        setSelected(buttonId)
    }

    useEffect(() => {
        onChange(selected)
    }, [selected])

    return (
        <Container>
            {children.map((child, index) => (
                <Button
                    {...child.props}
                    index={index}
                    lastIndex={children.length - 1}
                    key={index}
                    onClick={() => {
                        handleButtonClick(child.props.id)
                    }}
                    selected={selected === child.props.id}
                >
                    { child.props.children.map(child => ({
                        ...child,
                        props: {
                            ...child.props,
                            style: {
                                ...child.style,
                                pointerEvents: 'none',
                            }
                        }
                    })) }
                </Button>
            ))}
        </Container>
    )
}

ButtonGroup.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    defaultSelected: PropTypes.string,
    onChange: PropTypes.func,
}

export default ButtonGroup