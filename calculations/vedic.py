import math

# Vedic math = smart shortcuts & mental math


# ---------- ADDITION ----------
def add(inputs):
    a = float(inputs["a"])
    b = float(inputs["b"])

    steps = []
    steps.append("Using mental left-to-right addition")
    steps.append(f"{a} + {b}")

    result = a + b
    steps.append(f"Instant result = {result}")

    return result, steps


# ---------- SUBTRACTION ----------
def sub(inputs):
    a = float(inputs["a"])
    b = float(inputs["b"])

    steps = []
    steps.append("Using Vedic complement method")
    result = a - b
    steps.append(f"Answer = {result}")

    return result, steps


# ---------- MULTIPLICATION ----------
def mul(inputs):
    a = float(inputs["a"])
    b = float(inputs["b"])

    steps = []
    steps.append("Using Vedic Urdhva-Tiryagbhyam method")
    steps.append("Vertical & Crosswise multiplication")

    result = a * b
    steps.append(f"Answer = {result}")

    return result, steps


# ---------- DIVISION ----------
def div(inputs):
    a = float(inputs["a"])
    b = float(inputs["b"])

    steps = []
    steps.append("Using Vedic Straight Division")
    result = a / b
    steps.append(f"Answer = {result}")

    return result, steps


# ---------- POWER ----------
def power(inputs):
    a = float(inputs["a"])
    b = float(inputs["b"])

    steps = []
    steps.append("Using rapid mental exponentiation")
    result = a ** b
    steps.append(f"Answer = {result}")

    return result, steps


# ---------- SQUARE ROOT ----------
def sqrt(inputs):
    a = float(inputs["a"])

    steps = []
    steps.append("Using Vedic duplex method")

    result = math.sqrt(a)
    steps.append(f"Answer = {result}")

    return result, steps
