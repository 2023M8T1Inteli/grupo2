import './styles.css'
import back from '/back.svg'
import settings from '/settings.svg'

interface ButtonProps {
    value?: string,
    variant: "primary" | "secondary" | "back" | "settings",
    onClick?: any,
    to?: string
}

export default function Button(props: ButtonProps) {

    return (
        <>
            {
                props.to ?
                    <a className={`button-${props.variant}`} href={props.to}>
                        {props.value}
                    </a>
                    :
                    props.variant === "back"
                        ?
                        <button className={`button-${props.variant}`} onClick={() => { history.back() }}>
                            <img src={back} />
                        </button>
                        :
                        props.variant === "settings" ?
                            <a className={`button-${props.variant}`} href='/settings'>
                                <img src={settings} />
                            </a>
                            :
                            <button className={`button-${props.variant}`} onClick={props.onClick}>
                                {props.value}
                            </button>
            }
        </>
    )

}   