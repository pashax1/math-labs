import math
import time

# Babylonian calculations simulate base-60 style thinking
# We add small delays to simulate complex ancient calculations


# ---------- ADDITION ----------
def add(inputs):
    a = float(inputs["a"])
    b = float(inputs["b"])

    steps = []
    steps.append("Convert numbers to base-60 representation")
    time.sleep(0.15)

    steps.append("Add digits in base-60 columns")
    time.sleep(0.15)

    result = a + b
    steps.append("Convert result back to decimal")
    steps.append(f"Final result = {result}")

    return result, steps


# ---------- SUBTRACTION ----------
def sub(inputs):
    a = float(inputs["a"])
    b = float(inputs["b"])

    steps = []
    steps.append("Convert numbers to base-60")
    time.sleep(0.15)

    steps.append("Perform base-60 subtraction with borrowing")
    time.sleep(0.15)

    result = a - b
    steps.append("Convert back to decimal")
    steps.append(f"Final result = {result}")

    return result, steps


# ---------- MULTIPLICATION ----------
def mul(inputs):
    a = float(inputs["a"])
    b = float(inputs["b"])

    steps = []
    steps.append("Convert numbers to base-60")
    time.sleep(0.2)

    steps.append("Use repeated addition method")
    time.sleep(0.2)

    result = a * b
    steps.append("Convert back to decimal")
    steps.append(f"Final result = {result}")

    return result, steps


# ---------- DIVISION ----------
def div(inputs):
    a = float(inputs["a"])
    b = float(inputs["b"])

    steps = []
    steps.append("Convert numbers to base-60")
    time.sleep(0.2)

    steps.append("Use reciprocal tables")
    time.sleep(0.2)

    result = a / b
    steps.append("Convert result back to decimal")
    steps.append(f"Final result = {result}")

    return result, steps


# ---------- POWER ----------
def power(inputs):
    a = float(inputs["a"])
    b = float(inputs["b"])

    steps = []
    steps.append("Repeated multiplication in base-60")
    time.sleep(0.2)

    result = a ** b
    steps.append("Convert result back to decimal")
    steps.append(f"Final result = {result}")

    return result, steps


# ---------- SQUARE ROOT ----------
def sqrt(inputs):
    a = float(inputs["a"])

    steps = []
    steps.append("Using Babylonian square-root method")
    time.sleep(0.2)

    guess = a / 2
    for i in range(3):
        guess = (guess + a/guess) / 2
        steps.append(f"Iteration {i+1} → {round(guess,4)}")
        time.sleep(0.15)

    steps.append(f"Final result = {guess}")

    return guess, steps
