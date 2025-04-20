
import React, { useState } from "react";
import { motion } from "framer-motion";
const FlipCard = ({front,back}) => {
     const [isFlipped, setIsFlipped] = useState(false);
    return(
        <motion.div
            className="card-container"
            style={{
                width: "calc(var(--spacing) * 30)",
                height: "calc(var(--spacing) * 30)",
                perspective: "1000px",
            }}
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
        >
            <motion.div
                className="card"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    width: "calc(var(--spacing) * 30)",
                    height: "calc(var(--spacing) * 30)",
                    position: "relative",
                    transformStyle: "preserve-3d",
                }}
            >
                {/* Front Side */}
                <motion.div
                    className="card-front"
                    style={{
                        position: "absolute",
                        backfaceVisibility: "hidden",
                        width: "calc(var(--spacing) * 30)",
                        height: "calc(var(--spacing) * 30)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                {front}
                    
                </motion.div>

                {/* Back Side */}
                <motion.div
                    className="card-back"
                    style={{
                        position: "absolute",
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        width: "calc(var(--spacing) * 30)",
                        height: "calc(var(--spacing) * 30)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                   {back}
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
export default FlipCard