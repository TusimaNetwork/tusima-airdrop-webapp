import React from "react"
import styled from "styled-components"
import Countdown, { CountdownRenderProps } from "react-countdown"
import { useMemo } from "react"
import Button from "../Button"

interface ProgressCountdownProps {
  deadline: Date
}

const ProgressCountdown: React.FC<ProgressCountdownProps> = ({ deadline }) => {
  const dtxt = "d"
  const htxt = "h"
  const mtxt = "m"
  const stxt = "s"

  const deadlineVal = useMemo(() => {
    return deadline?.getTime()
  }, [deadline])
  const countdownRenderer = (countdownProps: CountdownRenderProps) => {
    const { days, hours, minutes, seconds } = countdownProps
    const d = String(days)
    const h = String(hours)
    const m = String(minutes)
    const s = String(seconds)
    if (Number(d) > 0) {
      return (
        <StyledCountdown>
          {d.padStart(2, "0")} {dtxt} {h.padStart(2, "0")} {htxt}{" "}
          {m.padStart(2, "0")} {mtxt}
        </StyledCountdown>
      )
    }
    return (
      <StyledCountdown>
        {h.padStart(2, "0")} {htxt} {m.padStart(2, "0")} {mtxt}{" "}
        {s.padStart(2, "0")} {stxt}
      </StyledCountdown>
    )
  }
  // return <div style={{width:200,height:200,backgroundColor:'red'}}>

  // </div>
  console.log({deadlineVal})
  return (
    <StyledCardContentInner disabled>
      <Countdown date={deadlineVal} renderer={countdownRenderer} />
    </StyledCardContentInner>
  )
}
const StyledCountdown = styled.p`
  /* line-height: 1.8;
  margin-top: 10px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7); */
`

const StyledCardContentInner = styled(Button)`
  display: flex;
  justify-content: center;
  flex-direction: column;
`

export default ProgressCountdown
