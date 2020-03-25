import React from 'react';


const SimplePopover= React.forwardRef((props, ref) => {
    return (
        <div className="form-control">
        <label htmlFor="priority">Price</label>
        <select type="number" id="priority" ref={ref} {...props}>
            <option value="0">Normal</option>
            <option value="1">Low</option>
            <option value="2">Medium</option>
            <option value="3">High</option>
        </select>
    </div>
    );
}
);

export default SimplePopover;