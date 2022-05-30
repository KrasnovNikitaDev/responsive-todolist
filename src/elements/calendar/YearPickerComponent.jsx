import React from "react";
import * as helper from './render_elememts_for_calendar.js';
import { useDispatch, useSelector } from "react-redux";



export const YearPicker = ({ date }) => {
    const dispatch = useDispatch();
    const dataArray = helper.render_years(date.currentYear);

    const select_item = (e, elem) => helper.selectItem(e, 'year', dispatch, elem)

    return <div className="years">
        {
            dataArray.map((row, i) => {
                return <div className="row" key={i}>
                    {
                        row.map((elem, i) => {
                            return <div
                                key={i}
                                className={elem.className}
                                onClick={(e) => select_item(e, elem)}>
                                {elem.v}
                            </div>
                        })
                    }
                </div>
            })
        }
    </div>
}