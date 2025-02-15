import styled from "@emotion/native";

type Position = {
    top: number,
    bottom: number,
    right: number,
    left: number,
}
export const AbsoluteView = styled.View<Partial<Position>> `
    top: ${(props) => props.top ? `${`${props.top}`}` : null};
    bottom: ${(props) => props.bottom ? `${`${props.bottom}`}` : null};
    left: ${(props) => props.left ? `${`${props.left}`}` : null};
    right: ${(props) => props.right ? `${`${props.right}`}` : null};
    position: absolute;
    z-index: 3;
`
