#lang racket/base
(require rackunit)

(define (square x) (* x x)) 
(define (squareSum x y) (+ (square x) (square y))) 


(define (foo a b c)
  (cond
    ((and (<= a b) (<= a c)) (squareSum b c))
    ((and (<= b a) (<= b c)) (squareSum a c))
    (else (squareSum a b))))


(check-equal? (foo 1 2 3) 13 "1 2 3")
(check-equal? (foo 2 3 1) 13 "1 2 3")
(check-equal? (foo 3 2 1) 13 "1 2 3")

(define (p) (p))

(define (test x y) 
  (if (= x 0) 
      0 
      y))

(test 0 (p))