const DropdownInput = ({ name, label, className, options, value, onChange }) => (
    <>
        {label && <label htmlFor={name}>{label}</label>}
        <select
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={className}
        >
            {options.map((value, index) => (
                <option default={index === 0} key={value} value={value}>
                    {value}
                </option>
            ))}
        </select>
    </>
)

export default DropdownInput;