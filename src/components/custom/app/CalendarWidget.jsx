import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Phone, Wrench } from 'lucide-react';
import DummyDataService from '@/services/DummyDataService';

const CalendarWidget = ({ dataItem }) => {
    // Get calendar data from data source
    const currentMonth = dataItem?.fileData?.current_month || 'October 2025';
    const currentDate = dataItem?.fileData?.current_date || new Date().getDate();
    const events = dataItem?.fileData?.events || [];
    const highlightedDates = dataItem?.fileData?.highlighted_dates || [];

    const [selectedDate, setSelectedDate] = useState(currentDate);
    const [engineeringCalls, setEngineeringCalls] = useState(0);
    const [maintenanceCalls, setMaintenanceCalls] = useState(0);

    // Load call counts from Andon & Maintenance tickets
    useEffect(() => {
        const loadCallCounts = async () => {
            try {
                // Get Andon tickets (Engineering Calls)
                const andonTickets = await DummyDataService.andon.getAll();
                setEngineeringCalls(andonTickets.length);

                // Get Maintenance tickets
                const maintenanceTickets = await DummyDataService.maintenance.getAll();
                setMaintenanceCalls(maintenanceTickets.length);
            } catch (error) {
                console.error('Error loading call counts:', error);
                // Fallback to data source values
                setEngineeringCalls(dataItem?.fileData?.engineering_calls || 3);
                setMaintenanceCalls(dataItem?.fileData?.maintenance_calls || 2);
            }
        };

        loadCallCounts();
    }, [dataItem]);

    // Generate calendar days for the month
    const generateCalendarDays = () => {
        // For October 2025: 31 days, starts on Wednesday (day 3)
        const daysInMonth = 31;
        const startDay = 3; // Wednesday
        const days = [];

        // Add empty cells for days before month starts
        for (let i = 0; i < startDay; i++) {
            days.push({ day: '', date: null, isEmpty: true });
        }

        // Add actual days
        for (let i = 1; i <= daysInMonth; i++) {
            const hasEvent = events.some(e => e.date === i);
            const isHighlighted = highlightedDates.includes(i);

            days.push({
                day: i,
                date: i,
                isEmpty: false,
                isCurrent: i === currentDate,
                isSelected: i === selectedDate,
                hasEvent: hasEvent,
                isHighlighted: isHighlighted
            });
        }

        return days;
    };

    const days = generateCalendarDays();
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const handleDateClick = (date) => {
        if (date) {
            setSelectedDate(date);
            console.log('Date selected:', date);

            // Find event for this date
            const dateEvent = events.find(e => e.date === date);
            if (dateEvent) {
                console.log('Event found:', dateEvent);
            }
        }
    };

    // Get event for selected date
    const selectedDateEvent = events.find(e => e.date === selectedDate);

    return (
        <div className="calendar-widget w-full h-full flex flex-col p-2">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">{currentMonth}</h3>
                <div className="flex items-center gap-2">
                    <button className="p-1 hover:bg-gray-700 rounded transition-colors">
                        <ChevronLeft className="h-4 w-4 text-gray-400" />
                    </button>
                    <button className="p-1 hover:bg-gray-700 rounded transition-colors">
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                    </button>
                </div>
            </div>

            {/* Week Days Header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
                {weekDays.map(day => (
                    <div
                        key={day}
                        className="text-center text-xs font-semibold text-gray-400 py-1"
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 flex-1">
                {days.map((day, index) => (
                    <div
                        key={index}
                        onClick={() => handleDateClick(day.date)}
                        className={`
              relative flex items-center justify-center text-sm font-medium rounded-lg
              transition-all cursor-pointer
              ${day.isEmpty ? 'invisible' : ''}
              ${day.isCurrent ? 'bg-blue-500 text-white ring-2 ring-blue-400' : ''}
              ${day.isSelected && !day.isCurrent ? 'bg-gray-700 text-white' : ''}
              ${!day.isCurrent && !day.isSelected ? 'text-gray-300 hover:bg-gray-700/50' : ''}
              ${day.hasEvent ? 'font-bold' : ''}
            `}
                        style={{ aspectRatio: '1/1' }}
                    >
                        {day.day}

                        {/* Event indicator dot */}
                        {day.hasEvent && (
                            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                            </div>
                        )}

                        {/* Highlighted indicator */}
                        {day.isHighlighted && !day.isCurrent && (
                            <div className="absolute top-1 right-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Selected Date Info */}
            {selectedDateEvent && (
                <div className="mt-3 bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                    <div className="text-xs font-semibold text-blue-400 mb-1">
                        📅 {currentMonth.split(' ')[0]} {selectedDate}
                    </div>
                    <div className="text-sm font-semibold text-white">{selectedDateEvent.title}</div>
                    <div className="text-xs text-gray-400 mt-1">{selectedDateEvent.description}</div>
                </div>
            )}

            {/* Call Summary Cards */}
            <div className="mt-3 pt-3 border-t border-gray-700">
                <div className="grid grid-cols-2 gap-3">
                    {/* Engineering Call Card */}
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="bg-blue-500/20 p-2 rounded-lg">
                                <Phone className="h-4 w-4 text-blue-400" />
                            </div>
                            <div className="text-xs text-gray-400">Engineering Call</div>
                        </div>
                        <div className="text-3xl font-bold text-blue-400">{engineeringCalls}</div>
                        <div className="text-xs text-blue-400/70 mt-1">Total Calls</div>
                    </div>

                    {/* Maintenance Card */}
                    <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="bg-orange-500/20 p-2 rounded-lg">
                                <Wrench className="h-4 w-4 text-orange-400" />
                            </div>
                            <div className="text-xs text-gray-400">Maintenance</div>
                        </div>
                        <div className="text-3xl font-bold text-orange-400">{maintenanceCalls}</div>
                        <div className="text-xs text-orange-400/70 mt-1">Total Calls</div>
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="mt-3 pt-3 border-t border-gray-700/50">
                <div className="flex items-center justify-center gap-4 text-xs">
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded bg-blue-500"></div>
                        <span className="text-gray-400">Today</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                        <span className="text-gray-400">Has Event</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarWidget;

