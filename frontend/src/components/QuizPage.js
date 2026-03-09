import React, { useState, useEffect, useCallback } from 'react';
import { ChevronRight, Trophy, Star, Clock, RefreshCw, CheckCircle2, XCircle, HelpCircle, ArrowRight, Home } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { QUIZ_QUESTIONS, QUIZ_CATEGORIES, DIFFICULTY_LEVELS } from '../data/quizData';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

const QuizPage = () => {
  const { openDrawer, setActiveSection } = useApp();
  
  // Quiz state
  const [gameState, setGameState] = useState('menu'); // 'menu', 'playing', 'result'
  const [selectedCategory, setSelectedCategory] = useState('tous');
  const [selectedDifficulty, setSelectedDifficulty] = useState('tous');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(false);

  // Filter and shuffle questions
  const prepareQuestions = useCallback(() => {
    let filtered = [...QUIZ_QUESTIONS];
    
    if (selectedCategory !== 'tous') {
      filtered = filtered.filter(q => q.categorie === selectedCategory);
    }
    if (selectedDifficulty !== 'tous') {
      filtered = filtered.filter(q => q.difficulte === selectedDifficulty);
    }
    
    // Shuffle and take 10 questions max
    const shuffled = filtered.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10);
  }, [selectedCategory, selectedDifficulty]);

  // Start quiz
  const startQuiz = () => {
    const preparedQuestions = prepareQuestions();
    if (preparedQuestions.length === 0) {
      alert('Aucune question disponible pour ces critères. Essayez d\'autres filtres.');
      return;
    }
    setQuestions(preparedQuestions);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setAnswers([]);
    setTimeLeft(30);
    setTimerActive(true);
    setGameState('playing');
  };

  // Timer effect
  useEffect(() => {
    let interval;
    if (timerActive && timeLeft > 0 && gameState === 'playing' && !showExplanation) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !showExplanation) {
      handleAnswer(-1); // Time's up, wrong answer
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft, gameState, showExplanation]);

  // Handle answer selection
  const handleAnswer = (answerIndex) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    setTimerActive(false);
    
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.reponseCorrect;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    setAnswers(prev => [...prev, {
      question: currentQuestion,
      selectedAnswer: answerIndex,
      isCorrect
    }]);
    
    setShowExplanation(true);
  };

  // Go to next question
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setTimeLeft(30);
      setTimerActive(true);
    } else {
      setGameState('result');
    }
  };

  // Reset quiz
  const resetQuiz = () => {
    setGameState('menu');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setAnswers([]);
  };

  // Get score message
  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return { text: "Parfait ! Vous êtes un expert !", emoji: "🏆" };
    if (percentage >= 80) return { text: "Excellent ! Vous connaissez bien l'histoire algérienne.", emoji: "🌟" };
    if (percentage >= 60) return { text: "Bien joué ! Continuez à explorer l'encyclopédie.", emoji: "👏" };
    if (percentage >= 40) return { text: "Pas mal ! Il y a encore des découvertes à faire.", emoji: "📚" };
    return { text: "Continuez à apprendre ! L'encyclopédie est là pour vous.", emoji: "🎓" };
  };

  // Render menu
  const renderMenu = () => (
    <div className="max-w-2xl mx-auto" data-testid="quiz-menu">
      {/* Title */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gold/10 border-2 border-gold mb-6">
          <HelpCircle size={40} className="text-gold" />
        </div>
        <h2 className="font-subheading text-3xl text-ink font-semibold">
          Testez vos connaissances
        </h2>
        <p className="font-body text-earth/70 mt-3">
          Répondez à 10 questions sur l'histoire de l'Algérie et découvrez votre score !
        </p>
      </div>

      {/* Category selection */}
      <div className="mb-8">
        <h3 className="font-ui text-xs uppercase tracking-wider text-legend mb-4">
          Choisissez une catégorie
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {QUIZ_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`p-4 border transition-all text-center ${
                selectedCategory === cat.id
                  ? 'border-gold bg-gold/10 text-gold'
                  : 'border-border hover:border-sand text-earth'
              }`}
              data-testid={`quiz-cat-${cat.id}`}
            >
              <span className="font-ui text-sm">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty selection */}
      <div className="mb-10">
        <h3 className="font-ui text-xs uppercase tracking-wider text-legend mb-4">
          Niveau de difficulté
        </h3>
        <div className="flex flex-wrap gap-3">
          {DIFFICULTY_LEVELS.map(level => (
            <button
              key={level.id}
              onClick={() => setSelectedDifficulty(level.id)}
              className={`px-6 py-3 border transition-all ${
                selectedDifficulty === level.id
                  ? 'border-gold bg-gold/10'
                  : 'border-border hover:border-sand'
              }`}
              data-testid={`quiz-diff-${level.id}`}
            >
              <span 
                className="font-ui text-sm"
                style={{ color: selectedDifficulty === level.id ? level.color : undefined }}
              >
                {level.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Start button */}
      <div className="text-center">
        <Button
          onClick={startQuiz}
          className="px-12 py-6 bg-gold hover:bg-gold/90 text-ink font-ui text-lg uppercase tracking-wider"
          data-testid="quiz-start-btn"
        >
          Commencer le quiz
          <ArrowRight size={20} className="ml-3" />
        </Button>
      </div>

      {/* Available questions count */}
      <p className="text-center font-caption text-sm text-earth/50 mt-6">
        {prepareQuestions().length} questions disponibles avec ces critères
      </p>
    </div>
  );

  // Render question
  const renderQuestion = () => {
    const question = questions[currentQuestionIndex];
    const difficultyColor = DIFFICULTY_LEVELS.find(d => d.id === question.difficulte)?.color || '#C4A35A';
    
    return (
      <div className="max-w-3xl mx-auto" data-testid="quiz-question">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="font-ui text-xs uppercase tracking-wider text-legend">
              Question {currentQuestionIndex + 1} / {questions.length}
            </span>
            <span className="font-number text-sm text-gold">
              Score : {score}
            </span>
          </div>
          <Progress 
            value={((currentQuestionIndex + 1) / questions.length) * 100} 
            className="h-2 bg-parchment-dark"
          />
        </div>

        {/* Timer */}
        {!showExplanation && (
          <div className="flex items-center justify-center gap-2 mb-6">
            <Clock size={18} className={timeLeft <= 10 ? 'text-roman-red' : 'text-earth'} />
            <span 
              className={`font-number text-2xl ${timeLeft <= 10 ? 'text-roman-red' : 'text-gold'}`}
            >
              {timeLeft}s
            </span>
          </div>
        )}

        {/* Question card */}
        <div className="section-card mb-8">
          {/* Category & difficulty */}
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="outline" className="text-xs">
              {question.categorie}
            </Badge>
            <Badge 
              variant="secondary" 
              className="text-xs"
              style={{ backgroundColor: `${difficultyColor}20`, color: difficultyColor }}
            >
              {question.difficulte}
            </Badge>
          </div>

          {/* Question text */}
          <h3 className="font-subheading text-xl sm:text-2xl text-ink font-semibold leading-relaxed">
            {question.question}
          </h3>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {question.options.map((option, index) => {
            let buttonClass = 'w-full text-left p-5 border transition-all ';
            
            if (showExplanation) {
              if (index === question.reponseCorrect) {
                buttonClass += 'border-cedar bg-cedar/10 text-cedar';
              } else if (index === selectedAnswer && index !== question.reponseCorrect) {
                buttonClass += 'border-roman-red bg-roman-red/10 text-roman-red';
              } else {
                buttonClass += 'border-border text-earth/50';
              }
            } else if (selectedAnswer === index) {
              buttonClass += 'border-gold bg-gold/10 text-gold';
            } else {
              buttonClass += 'border-border hover:border-sand hover:bg-parchment-dark text-ink';
            }

            return (
              <button
                key={index}
                onClick={() => !showExplanation && handleAnswer(index)}
                disabled={showExplanation}
                className={buttonClass}
                data-testid={`quiz-option-${index}`}
              >
                <div className="flex items-center gap-4">
                  <span 
                    className="w-10 h-10 flex items-center justify-center border font-number text-lg flex-shrink-0"
                    style={{ 
                      borderColor: showExplanation && index === question.reponseCorrect ? '#2D5A27' : 'inherit'
                    }}
                  >
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="font-body text-lg">{option}</span>
                  {showExplanation && index === question.reponseCorrect && (
                    <CheckCircle2 size={24} className="ml-auto text-cedar" />
                  )}
                  {showExplanation && index === selectedAnswer && index !== question.reponseCorrect && (
                    <XCircle size={24} className="ml-auto text-roman-red" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className="mb-8 animate-fade-in-up" data-testid="quiz-explanation">
            <div 
              className={`p-6 border-l-4 ${
                selectedAnswer === question.reponseCorrect 
                  ? 'bg-cedar/10 border-cedar' 
                  : 'bg-roman-red/10 border-roman-red'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                {selectedAnswer === question.reponseCorrect ? (
                  <>
                    <CheckCircle2 size={20} className="text-cedar" />
                    <span className="font-ui text-sm uppercase tracking-wider text-cedar">
                      Bonne réponse !
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle size={20} className="text-roman-red" />
                    <span className="font-ui text-sm uppercase tracking-wider text-roman-red">
                      {selectedAnswer === -1 ? 'Temps écoulé !' : 'Mauvaise réponse'}
                    </span>
                  </>
                )}
              </div>
              <p className="font-body text-ink/90 leading-relaxed">
                {question.explication}
              </p>
              {question.lien && (
                <button
                  onClick={() => openDrawer(question.lien.type, question.lien.id)}
                  className="mt-4 font-ui text-xs uppercase tracking-wider text-gold hover:underline"
                >
                  En savoir plus →
                </button>
              )}
            </div>
          </div>
        )}

        {/* Next button */}
        {showExplanation && (
          <div className="text-center">
            <Button
              onClick={nextQuestion}
              className="px-10 py-4 bg-gold hover:bg-gold/90 text-ink font-ui uppercase tracking-wider"
              data-testid="quiz-next-btn"
            >
              {currentQuestionIndex < questions.length - 1 ? 'Question suivante' : 'Voir les résultats'}
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </div>
        )}
      </div>
    );
  };

  // Render results
  const renderResults = () => {
    const { text, emoji } = getScoreMessage();
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <div className="max-w-2xl mx-auto text-center" data-testid="quiz-results">
        {/* Trophy */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gold/10 border-2 border-gold mb-6">
            <Trophy size={48} className="text-gold" />
          </div>
          <h2 className="font-subheading text-3xl text-ink font-semibold">
            Quiz terminé !
          </h2>
        </div>

        {/* Score */}
        <div className="section-card mb-8 py-10">
          <div className="text-6xl mb-4">{emoji}</div>
          <div className="font-heading text-5xl text-gold mb-4">
            {score} / {questions.length}
          </div>
          <div className="font-number text-2xl text-earth mb-4">
            {percentage}%
          </div>
          <p className="font-body text-lg text-ink/80">
            {text}
          </p>
        </div>

        {/* Answers review */}
        <div className="mb-10">
          <h3 className="font-ui text-xs uppercase tracking-wider text-legend mb-4">
            Récapitulatif des réponses
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {answers.map((answer, index) => (
              <div
                key={index}
                className={`w-10 h-10 flex items-center justify-center border ${
                  answer.isCorrect 
                    ? 'bg-cedar/10 border-cedar text-cedar' 
                    : 'bg-roman-red/10 border-roman-red text-roman-red'
                }`}
              >
                <span className="font-number">{index + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={resetQuiz}
            variant="outline"
            className="px-8 py-4 font-ui uppercase tracking-wider"
            data-testid="quiz-retry-btn"
          >
            <RefreshCw size={18} className="mr-2" />
            Rejouer
          </Button>
          <Button
            onClick={() => setActiveSection('home')}
            className="px-8 py-4 bg-gold hover:bg-gold/90 text-ink font-ui uppercase tracking-wider"
            data-testid="quiz-home-btn"
          >
            <Home size={18} className="mr-2" />
            Retour à l'accueil
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen" data-testid="quiz-page">
      {/* Header */}
      <div className="bg-parchment-dark border-b border-border py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-earth/60 mb-4">
            <span className="font-ui uppercase tracking-wider">Accueil</span>
            <ChevronRight size={14} />
            <span className="font-ui uppercase tracking-wider text-gold">Quiz</span>
          </div>
          <h1 className="font-subheading text-3xl sm:text-4xl text-ink font-semibold">
            Quiz Historique
          </h1>
          <p className="font-body text-earth/70 mt-2 max-w-2xl">
            Testez vos connaissances sur l'histoire de l'Algérie de la préhistoire à nos jours.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {gameState === 'menu' && renderMenu()}
        {gameState === 'playing' && renderQuestion()}
        {gameState === 'result' && renderResults()}
      </div>
    </div>
  );
};

export default QuizPage;
