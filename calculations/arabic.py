import math

# ---------- ADDITION ----------
def add(inputs):
    a = float(inputs["a"])
    b = float(inputs["b"])

    steps = []
    steps.append(f"Align numbers vertically: {a} + {b}")
    steps.append("Add units column")
    steps.append("Carry if needed")
    result = a + b
    steps.append(f"Final result = {result}")

    return result, steps


# ---------- SUBTRACTION ----------
def sub(inputs):
    a = float(inputs["a"])
    b = float(inputs["b"])

    steps = []
    steps.append(f"Align numbers vertically: {a} - {b}")
    steps.append("Borrow if needed")
    result = a - b
    steps.append(f"Final result = {result}")

    return result, steps


# ---------- MULTIPLICATION ----------
def mul(inputs):
    a = float(inputs["a"])
    b = float(inputs["b"])

    steps = []
    steps.append("Using long multiplication")
    steps.append(f"{a} × {b}")

    result = a * b
    steps.append(f"Final result = {result}")

    return result, steps


# ---------- DIVISION ----------
def div(inputs):
    a = float(inputs["a"])
    b = float(inputs["b"])

    steps = []
    steps.append("Using long division")
    result = a / b
    steps.append(f"Final result = {result}")

    return result, steps


# ---------- POWER ----------
def power(inputs):
    a = float(inputs["a"])
    b = float(inputs["b"])

    steps = []
    steps.append(f"Compute {a}^{b}")
    result = a ** b
    steps.append(f"Final result = {result}")

    return result, steps


# ---------- SQUARE ROOT ----------
def sqrt(inputs):
    a = float(inputs["a"])

    steps = []
    steps.append("Using standard square root method")
    result = math.sqrt(a)
    steps.append(f"Final result = {result}")

    return result, steps
