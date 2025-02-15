import styled from "@emotion/native";

export type AbsoluteViewType = {
    top: number,
    bottom: number,
    right: number,
    left: number,
    width: number
}
export const AbsoluteView = styled.View<Partial<AbsoluteViewType>> `
    top: ${(props) => props.top ? `${`${props.top}`}px` : null};
    bottom: ${(props) => props.bottom ? `${`${props.bottom}`}px` : null};
    left: ${(props) => props.left ? `${`${props.left}`}px` : null};
    right: ${(props) => props.right ? `${`${props.right}`}px` : null};
    width: ${(props) => props.width ? `${`${props.width}%`}` : null};
    position: absolute;
    z-index: 3;
`
