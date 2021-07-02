#lang racket/base
(require rackunit)

(define (square x) (* x x)) 
(define (average x y) (/ (+ x y) 2))

(define (sqrt x)
  (define (good-enough? guess)
    (< (abs (- (square guess) x)) 0.001))
  (define (improve guess)
    (average guess (/ x guess)))
  (define (sqrt-iter guess)
    (if (good-enough? guess)
        guess
        (sqrt-iter (improve guess))))
  (sqrt-iter 1.0))


; Use block structure (functions nested in functions)
; too hide implementation + lecical scoping (x used in nested fucntions)

(check-within (sqrt 4) 2 0.01 "sqrt of 4")