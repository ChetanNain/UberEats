import './Button.css';

export default function Button(props) {
    return (
        <button type="submit" className={props.color}>{props.children}</button>
    )
}