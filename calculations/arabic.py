# Arabic (modern decimal) calculation engine

def addition(inputs):
    a = float(inputs["a"])
    b = float(inputs["b"])

    steps = [
        f"Write numbers vertically: {a} + {b}",
        "Add digits column by column",
        "Carry if sum >= 10",
        "Final sum computed"
    ]

    return a + b, steps


def subtraction(inputs):
    a = float(inputs["a"])
    b = float(inputs["b"])

    steps = [
        f"Write numbers vertically: {a} - {b}",
        "Subtract digits column by column",
        "Borrow if needed",
        "Final difference computed"
    ]

    return a - b, steps


def multiplication(inputs):
    a = float(inputs["a"])
    b = float(inputs["b"])

    steps = [
        f"Multiply {a} × {b}",
        "Multiply digit by digit",
        "Add intermediate results",
        "Final product computed"
    ]

    return a * b, steps


def division(inputs):
    a = float(inputs["a"])
    b = float(inputs["b"])

    steps = [
        f"Divide {a} ÷ {b}",
        "Perform long division",
        "Compute quotient",
        "Final result computed"
    ]

    return a / b, steps
